"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";
import styles from "../auth.module.css";

function getPasswordStrength(password) {
    if (!password) return { score: 0, label: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const labels = ["", "Zayıf", "Orta", "İyi", "Güçlü", "Çok Güçlü"];
    const levels = ["", "weak", "fair", "good", "strong", "strong"];
    return { score, label: labels[score], level: levels[score] };
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});

    const strength = getPasswordStrength(formData.password);

    const validate = useCallback(() => {
        const errs = {};
        if (touched.name && !formData.name.trim()) errs.name = "İsim gerekli";
        if (touched.email && formData.email && !validateEmail(formData.email)) errs.email = "Geçerli bir e-posta girin";
        if (touched.password && formData.password && formData.password.length < 6) errs.password = "En az 6 karakter olmalı";
        if (touched.confirmPassword && formData.confirmPassword && formData.password !== formData.confirmPassword) errs.confirmPassword = "Şifreler eşleşmiyor";
        return errs;
    }, [formData, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setGlobalError("");
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const fieldErrors = validate();

    const isFormValid = formData.name.trim() && validateEmail(formData.email) &&
        formData.password.length >= 6 && formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, password: true, confirmPassword: true });

        if (!isFormValid) return;

        setLoading(true);
        setGlobalError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setGlobalError(data.message || "Kayıt başarısız oldu");
                setLoading(false);
                return;
            }

            // Auto-login after successful registration
            const signInRes = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (signInRes?.error) {
                // Fallback: redirect to signin if auto-login fails
                router.push("/signin");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setGlobalError("Bir hata oluştu. Tekrar deneyin.");
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
                    <h1 className={styles.title}>Hesap Oluştur</h1>
                    <p className={styles.subtitle}>Kişiselleştirilmiş vitamin yolculuğunuza başlayın</p>
                </div>

                {globalError && (
                    <div className={styles.errorBanner}>
                        <AlertCircle size={16} />
                        {globalError}
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Ad Soyad</label>
                        <div className={styles.inputWrapper}>
                            <User size={16} className={styles.inputIcon} />
                            <input
                                className={`${styles.input} ${fieldErrors.name ? styles.inputError : ""}`}
                                type="text"
                                name="name"
                                placeholder="Adınızı girin"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="name"
                            />
                        </div>
                        {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>E-posta</label>
                        <div className={styles.inputWrapper}>
                            <Mail size={16} className={styles.inputIcon} />
                            <input
                                className={`${styles.input} ${fieldErrors.email ? styles.inputError : (touched.email && formData.email && validateEmail(formData.email) ? styles.inputSuccess : "")}`}
                                type="email"
                                name="email"
                                placeholder="ornek@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="email"
                            />
                        </div>
                        {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Şifre</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={16} className={styles.inputIcon} />
                            <input
                                className={`${styles.input} ${fieldErrors.password ? styles.inputError : ""}`}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="En az 6 karakter"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="new-password"
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
                        {formData.password && (
                            <>
                                <div className={styles.strengthBar}>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div
                                            key={i}
                                            className={`${styles.strengthSegment} ${i <= strength.score ? `${styles.active} ${styles[strength.level]}` : ""}`}
                                        />
                                    ))}
                                </div>
                                <p className={styles.strengthText}>{strength.label}</p>
                            </>
                        )}
                        {fieldErrors.password && <p className={styles.fieldError}>{fieldErrors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Şifre Tekrar</label>
                        <div className={styles.inputWrapper}>
                            <Lock size={16} className={styles.inputIcon} />
                            <input
                                className={`${styles.input} ${fieldErrors.confirmPassword ? styles.inputError : (touched.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword ? styles.inputSuccess : "")}`}
                                type="password"
                                name="confirmPassword"
                                placeholder="Şifrenizi tekrar girin"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="new-password"
                            />
                        </div>
                        {fieldErrors.confirmPassword && <p className={styles.fieldError}>{fieldErrors.confirmPassword}</p>}
                    </div>

                    <button className={styles.submitBtn} type="submit" disabled={loading}>
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            <>Kayıt Ol <ArrowRight size={16} /></>
                        )}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Zaten hesabınız var mı?{" "}
                    <Link href="/signin" className={styles.footerLink}>Giriş Yap</Link>
                </p>
            </div>
        </div>
    );
}
