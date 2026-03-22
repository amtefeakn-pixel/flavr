"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Zap, Moon, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isShopHovered, setIsShopHovered] = useState(false);
    const pathname = usePathname();
    const isQuizPage = pathname?.startsWith("/quiz");
    const { data: session, status } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isLoggedIn = status === "authenticated" && session?.user;

    return (
        <>
            <header className={styles.header}>
                <div className={`container ${styles.container}`}>
                    <Link href="/" className={`${styles.logo} ${isQuizPage ? styles.quizLogo : ""}`}>
                        <Image src="/logo.png" alt="Flavr Logo" width={1200} height={300} className={styles.logoImage} priority />
                    </Link>

                    {/* Desktop Nav - Hidden on Quiz Page */}
                    {!isQuizPage && (
                        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
                            <div
                                className={styles.navItem}
                                onMouseEnter={() => setIsShopHovered(true)}
                                onMouseLeave={() => setIsShopHovered(false)}
                            >
                                <Link href="/shop" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                                    Mağaza <ChevronDown size={16} />
                                </Link>

                                <AnimatePresence>
                                    {isShopHovered && (
                                        <motion.div
                                            className={styles.megaMenu}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className={styles.megaMenuItem}>
                                                <Zap size={20} className={styles.menuIcon} />
                                                <span>Enerji</span>
                                            </div>
                                            <div className={styles.megaMenuItem}>
                                                <Moon size={20} className={styles.menuIcon} />
                                                <span>Uyku</span>
                                            </div>
                                            <div className={styles.megaMenuItem}>
                                                <Shield size={20} className={styles.menuIcon} />
                                                <span>Bağışıklık</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="/catalog" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                                Katalog
                            </Link>

                            <Link href="/about" className={styles.link} onClick={() => setIsMenuOpen(false)}>Hakkımızda</Link>
                            <Link href="/blog" className={styles.link} onClick={() => setIsMenuOpen(false)}>Blog</Link>

                            <Link href="/quiz" className={styles.quizBtn} onClick={() => setIsMenuOpen(false)}>
                                Testi Çöz
                            </Link>
                        </nav>
                    )}

                    {/* Quiz Progress Indicator (Only on Quiz Page) */}
                    {isQuizPage && (
                        <div className={styles.quizProgress}>
                            <span>AŞAMA 1/5: TEMEL HEDEFLER</span>
                        </div>
                    )}

                    <div className={styles.actions}>
                        {!isQuizPage && (
                            <>
                                <Link href="/search" className={styles.iconBtn} aria-label="Search">
                                    <Search size={20} />
                                </Link>

                                {mounted && isLoggedIn ? (
                                    <Link href="/dashboard" className={styles.avatarBtn} aria-label="Dashboard">
                                        <span className={styles.avatarInitial}>
                                            {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                                        </span>
                                    </Link>
                                ) : (
                                    <Link href="/signin" className={styles.iconBtn} aria-label="Account">
                                        <User size={20} />
                                    </Link>
                                )}
                            </>
                        )}

                        <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
                            <ShoppingCart size={20} />
                            {mounted && <span className={styles.badge}>0</span>}
                        </Link>

                        {!isQuizPage && (
                            <button
                                className={styles.menuBtn}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
