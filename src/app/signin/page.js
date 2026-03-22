"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import styles from "../auth.module.css";

export default function SignInPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                setError("E-posta veya şifre hatalı");
                setLoading(false);
            } else {
                const session = await getSession();
                router.refresh();
                if (session?.user?.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            }
        } catch {
            setError("Bir hata oluştu. Tekrar deneyin.");
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.brandHeader}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Flavr" width={600} height={150} className={styles.brandLogo} priority />
                    </Link>
                    <h1 className={styles.title}>Tekrar Hoş Geldiniz</h1>
                    <p className={styles.subtitle}>Hesabınıza giriş yaparak kaldığınız yerden devam edin</p>
                </div>

                {error && (
                    <div className={styles.errorBanner}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>E-posta</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={16} className={styles.inputIcon} />
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                placeholder="ornek@email.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Şifre</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={16} className={styles.inputIcon} />
                            <input
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Şifrenizi girin"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                style={{ paddingRight: "2.75rem" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button className={styles.submitBtn} type="submit" disabled={loading}>
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            <>Giriş Yap <ArrowRight size={16} /></>
                        )}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Hesabınız yok mu?{" "}
                    <Link href="/register" className={styles.footerLink}>Kayıt Ol</Link>
                </p>
            </div>
        </div>
    );
}
