"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const router = useRouter();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [isTorn, setIsTorn] = useState(false);
    const [isZooming, setIsZooming] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 600);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 25;
            const moveY = (clientY - window.innerHeight / 2) / 25;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const handleDragEnd = async (event, info) => {
        if (info.offset.x > 100) {
            setIsTorn(true);
            // Trigger tear animation
            await controls.start({ x: 300, opacity: 0, transition: { duration: 0.3 } });

            // Wait for tear, then zoom
            setTimeout(() => {
                setIsZooming(true);
                // Navigate after zoom
                setTimeout(() => {
                    router.push("/quiz");
                }, 800);
            }, 300);
        } else {
            controls.start({ x: 0 });
        }
    };

    return (
        <section className={`${styles.hero} ${isZooming ? styles.zooming : ""}`}>
            <div className={`container ${styles.container}`}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isZooming ? 0 : 1, y: isZooming ? -50 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className={styles.title}>
                        Sizin İçin Kişiselleştirilmiş <br />
                        <span className={styles.highlight}>Günlük Vitaminler</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Bilimsel verilerle hazırlanan, isminize özel paketlenmiş günlük vitamin desteğiniz.
                    </p>
                    <div className={styles.buttons}>
                        <Link href="/quiz" className={`btn btn-primary ${styles.pulseBtn}`}>Testi Çöz</Link>
                        <Link href="/shop" className="btn btn-outline">Tüm Ürünler</Link>
                    </div>
                    <div className={styles.trust}>
                        <span>✓ Bilimsel Destekli</span>
                        <span>✓ Premium İçerik</span>
                        <span>✓ Kişiye Özel</span>
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.imageWrapper} ${isZooming ? styles.wrapperZoom : ""}`}
                    style={isMobile ? {} : { y }}
                    animate={isZooming ? { scale: 15, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {/* Live Ingredient Visualizer */}
                    <div className={styles.dynamicVisual}>
                        {/* Flying Vitamins (Explosion on Tear) */}
                        {isTorn && (
                            <>
                                <motion.div className={`${styles.ingredient} ${styles.capsuleYellow}`} initial={{ x: 0, y: 0 }} animate={{ x: -200, y: -300, rotate: 360, scale: 1.5 }} transition={{ duration: 0.8 }} style={{ top: "40%", left: "40%" }} />
                                <motion.div className={`${styles.ingredient} ${styles.tabletBlue}`} initial={{ x: 0, y: 0 }} animate={{ x: 200, y: -250, rotate: -180, scale: 1.5 }} transition={{ duration: 0.8 }} style={{ top: "40%", left: "40%" }} />
                                <motion.div className={`${styles.ingredient} ${styles.softgelWhite}`} initial={{ x: 0, y: 0 }} animate={{ x: -150, y: 150, rotate: 90, scale: 1.5 }} transition={{ duration: 0.8 }} style={{ top: "40%", left: "40%" }} />
                                <motion.div className={`${styles.ingredient} ${styles.tabletOrange}`} initial={{ x: 0, y: 0 }} animate={{ x: 180, y: 200, rotate: -90, scale: 1.5 }} transition={{ duration: 0.8 }} style={{ top: "40%", left: "40%" }} />
                            </>
                        )}

                        {!isTorn && (
                            <>
                                <motion.div className={`${styles.ingredient} ${styles.capsuleYellow}`} style={{ x: springX, y: springY, top: "15%", left: "15%" }} animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
                                <motion.div className={`${styles.ingredient} ${styles.tabletBlue}`} style={{ x: springX, y: springY, top: "65%", right: "25%" }} animate={{ rotate: [0, -15, 15, 0], y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
                                <motion.div className={`${styles.ingredient} ${styles.softgelWhite}`} style={{ x: springX, y: springY, top: "25%", right: "10%" }} animate={{ rotate: [0, 20, -20, 0], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
                                <motion.div className={`${styles.ingredient} ${styles.tabletOrange}`} style={{ x: springX, y: springY, bottom: "20%", left: "20%" }} animate={{ rotate: [0, -5, 5, 0], y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
                            </>
                        )}

                        <div className={styles.packMockup}>
                            {/* Tear Strip */}
                            <motion.div
                                className={styles.tearStrip}
                                drag="x"
                                dragConstraints={{ left: 0, right: 200 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                animate={controls}
                                whileHover={{ scale: 1.05, cursor: "grab" }}
                                whileTap={{ cursor: "grabbing" }}
                            >
                                <div className={styles.tearPattern}></div>
                                <span className={styles.tearText}>AÇMAK İÇİN ÇEKİN &rarr;</span>
                            </motion.div>

                            <div className={styles.packBody}>
                                <div className={styles.packLabel}>
                                    <div className={styles.brandName}>
                                        <Image src="/logo.png" alt="Flavr Logo" width={400} height={125} className={styles.packLogo} />
                                    </div>
                                    <span className={styles.customerName}>Ayşe Yılmaz</span>
                                    <div className={styles.packDetails}>
                                        <span>Günlük Paket</span>
                                        <span>08:00</span>
                                    </div>
                                </div>
                                <div className={styles.packWindow}>
                                    {!isTorn && (
                                        <>
                                            <div className={styles.innerPill1}></div>
                                            <div className={styles.innerPill2}></div>
                                            <div className={styles.innerPill3}></div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
