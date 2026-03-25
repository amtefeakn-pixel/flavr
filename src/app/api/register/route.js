import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeName, sanitizeEmail, validatePassword } from "@/lib/sanitize";
import { logSecurityEvent } from "@/lib/audit";

export async function POST(req) {
    try {
        // Rate limit: 5 registrations per minute per IP
        const limited = checkRateLimit(req, { limit: 5, windowMs: 60000 });
        if (limited) return limited;

        // 1. Parse and validate input
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { message: "Geçersiz istek formatı" },
                { status: 400 }
            );
        }

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Tüm alanlar zorunludur" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Geçerli bir e-posta adresi girin" },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Şifre en az 6 karakter olmalıdır" },
                { status: 400 }
            );
        }

        // 2. Check for existing user
        let existingUser;
        try {
            existingUser = await prisma.user.findUnique({
                where: { email: email.toLowerCase().trim() },
            });
        } catch (dbError) {
            console.error("Database connection error (findUnique):", dbError.message);
            return NextResponse.json(
                { message: "Veritabanı bağlantı hatası. Lütfen tekrar deneyin." },
                { status: 503 }
            );
        }

        if (existingUser) {
            return NextResponse.json(
                { message: "Bu e-posta adresi zaten kayıtlı" },
                { status: 409 }
            );
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user in database
        let newUser;
        try {
            newUser = await prisma.user.create({
                data: {
                    name: name.trim(),
                    email: email.toLowerCase().trim(),
                    password: hashedPassword,
                },
            });
        } catch (dbError) {
            console.error("Database write error (create):", dbError.message);

            // Handle unique constraint violation (race condition)
            if (dbError.code === "P2002") {
                return NextResponse.json(
                    { message: "Bu e-posta adresi zaten kayıtlı" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { message: "Kullanıcı oluşturulamadı. Veritabanı hatası." },
                { status: 503 }
            );
        }

        // 5. Send welcome email (fire-and-forget — never block registration)
        sendWelcomeEmail(newUser.email, newUser.name).catch((emailError) => {
            console.warn("Welcome email failed (non-blocking):", emailError.message);
        });

        // 6. Return success (exclude password from response)
        return NextResponse.json(
            {
                message: "Hesap başarıyla oluşturuldu",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        // Catch-all for unexpected errors
        console.error("Registration unexpected error:", {
            name: error.name,
            message: error.message,
            stack: error.stack?.split("\n").slice(0, 5).join("\n"),
        });

        return NextResponse.json(
            { message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }
}
