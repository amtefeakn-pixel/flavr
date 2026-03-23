import { getServerSession } from "next-auth"
import prisma from "@/lib/db"

const ADMIN_EMAILS = [
    "flavr@flavrtr.info",
    "amtefeakin@gmail.com",
]

export async function GET(req) {
    const session = await getServerSession()

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
        return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                results: {
                    select: { id: true },
                },
            },
            orderBy: { createdAt: "desc" },
        })

        const formatted = users.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            joined: u.createdAt.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }),
            quizCount: u.results.length,
        }))

        return Response.json(formatted)
    } catch (error) {
        console.error("Admin users API error:", error)
        return Response.json({ error: "Database error" }, { status: 500 })
    }
}

export async function DELETE(req) {
    const session = await getServerSession()

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
        return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    try {
        const { userId } = await req.json()

        if (!userId) {
            return Response.json({ error: "userId required" }, { status: 400 })
        }

        await prisma.quizResult.deleteMany({ where: { userId } })
        await prisma.user.delete({ where: { id: userId } })

        return Response.json({ success: true })
    } catch (error) {
        console.error("Admin delete user error:", error)
        return Response.json({ error: "Database error" }, { status: 500 })
    }
}

export async function PATCH(req) {
    const session = await getServerSession()

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email.toLowerCase())) {
        return Response.json({ error: "Unauthorized" }, { status: 403 })
    }

    try {
        const { userId, role } = await req.json()

        if (!userId || !role) {
            return Response.json({ error: "userId and role required" }, { status: 400 })
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, role: true },
        })

        return Response.json(updated)
    } catch (error) {
        console.error("Admin update user error:", error)
        return Response.json({ error: "Database error" }, { status: 500 })
    }
}
