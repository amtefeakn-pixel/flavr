import { NextResponse } from "next/server";
import { BioMatchEngine } from "@/lib/bioMatchCore";
import { questions } from "@/data/quizData";
import prisma from "@/lib/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { answers } = body;

        if (!answers) {
            return NextResponse.json({ message: "No answers provided" }, { status: 400 });
        }

        // 1. Initialize Engine
        const engine = new BioMatchEngine(questions);

        // 2. Process Quiz
        const result = engine.processQuiz(answers);

        // result contains: { userProfile, flags, recommendations }

        // 3. Save to Database (Optional: Find User by Email)
        let userId = null;
        if (answers.email) {
            const user = await prisma.user.findUnique({ where: { email: answers.email } });
            if (user) userId = user.id;
        }

        const resultData = {
            scoreBreakdown: result.userProfile,
            recommendedProducts: result.recommendations,
            flags: result.flags
        };

        if (userId) {
            // Check if quizResult model supports this structure or store as JSON
            // Assuming schema support or flexible Json type
            await prisma.quizResult.create({
                data: {
                    userId: userId,
                    scoreBreakdown: resultData.scoreBreakdown,
                    recommendedProducts: resultData.recommendedProducts
                }
            });
        }

        return NextResponse.json({
            success: true,
            recommendations: result.recommendations,
            scores: result.userProfile,
            flags: result.flags
        });

    } catch (error) {
        console.error("Quiz Processing Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
