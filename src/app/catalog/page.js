"use client";
import { useState, useMemo } from "react";
import { Search, ArrowRight, AlertCircle, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_PRODUCTS } from "@/lib/bioMatchCore";
import styles from "./page.module.css";

const CLUSTER_LABELS = {
    All: "Tümü",
    Foundation: "Temel",
    Magnesium: "Magnezyum",
    Insulin: "İnsülin",
    Adaptogen: "Adaptogen",
    Inflammation: "İnflamasyon",
    Specific: "Özel",
    Energy: "Enerji",
    Gut: "Bağırsak",
    Sleep: "Uyku",
    Brain: "Beyin",
    Detox: "Detoks",
    Mood: "Ruh Hali",
    Structural: "Yapısal",
};

const EFFICACY_LABELS = {
    HPA: "Stres Ekseni",
    NEURO: "Nöroloji",
    GLUCO: "Kan Şekeri",
    MITO: "Enerji Üretimi",
    GUT: "Sindirim",
    LIVER: "Karaciğer",
    IMM: "Bağışıklık",
    INF: "İnflamasyon",
    SLEEP: "Uyku",
};

const CLUSTER_COLORS = {
    Foundation: { bg: "#e0f2fe", text: "#0369a1", accent: "#0ea5e9" },
    Magnesium: { bg: "#dcfce7", text: "#15803d", accent: "#22c55e" },
    Adaptogen: { bg: "#f3e8ff", text: "#7e22ce", accent: "#a855f7" },
    Insulin: { bg: "#fff7ed", text: "#c2410c", accent: "#f97316" },
    Detox: { bg: "#ecfdf5", text: "#047857", accent: "#10b981" },
    Sleep: { bg: "#eef2ff", text: "#4338ca", accent: "#6366f1" },
    Gut: { bg: "#fef3c7", text: "#b45309", accent: "#f59e0b" },
    Energy: { bg: "#fef9c3", text: "#a16207", accent: "#eab308" },
    Brain: { bg: "#fce7f3", text: "#be185d", accent: "#ec4899" },
    Mood: { bg: "#ede9fe", text: "#6d28d9", accent: "#8b5cf6" },
    Inflammation: { bg: "#fee2e2", text: "#b91c1c", accent: "#ef4444" },
    Structural: { bg: "#f5f5f4", text: "#57534e", accent: "#78716c" },
    Specific: { bg: "#ccfbf1", text: "#0f766e", accent: "#14b8a6" },
};

const PRODUCT_ICONS = {
    Foundation: "💊",
    Magnesium: "🧲",
    Adaptogen: "🌿",
    Insulin: "📊",
    Detox: "🫧",
    Sleep: "🌙",
    Gut: "🦠",
    Energy: "⚡",
    Brain: "🧠",
    Mood: "🎭",
    Inflammation: "🔥",
    Structural: "🦴",
    Specific: "🎯",
};

export default function CatalogPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCluster, setActiveCluster] = useState("All");

    const clusters = useMemo(() => {
        const unique = [...new Set(ALL_PRODUCTS.map(p => p.cluster))];
        return ["All", ...unique];
    }, []);

    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.cluster.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCluster = activeCluster === "All" || p.cluster === activeCluster;
            return matchesSearch && matchesCluster;
        });
    }, [searchTerm, activeCluster]);

    return (
        <>
            <Header />
            <main className={styles.page}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <motion.p
                            className={styles.heroLabel}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            FLAVR KATALOG
                        </motion.p>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Vitamin & Supplement <br />Koleksiyonu
                        </motion.h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Bilimsel formüller, premium ingredientler. Vücudunuzun ihtiyaç duyduğu
                            her şey tek bir koleksiyonda.
                        </motion.p>
                    </div>
                </section>

                {/* Toolbar */}
                <section className={styles.toolbar}>
                    <div className={styles.toolbarInner}>
                        <div className={styles.searchWrapper}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Vitamin veya mineral ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        <div className={styles.filterSection}>
                            <SlidersHorizontal size={15} className={styles.filterLabel} />
                            <div className={styles.filterTabs}>
                                {clusters.map(cluster => (
                                    <button
                                        key={cluster}
                                        className={`${styles.filterTab} ${activeCluster === cluster ? styles.activeTab : ""}`}
                                        onClick={() => setActiveCluster(cluster)}
                                    >
                                        {CLUSTER_LABELS[cluster] || cluster}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className={styles.resultCount}>
                            {filteredProducts.length} ürün listeleniyor
                        </p>
                    </div>
                </section>

                {/* Product Grid */}
                <section className={styles.gridSection}>
                    <div className={styles.gridWrapper}>
                        {filteredProducts.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Search size={48} strokeWidth={1} />
                                <p>Aramanızla eşleşen ürün bulunamadı.</p>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((p, idx) => {
                                        const colors = CLUSTER_COLORS[p.cluster] || { bg: "#f3f4f6", text: "#6b7280", accent: "#9ca3af" };
                                        const icon = PRODUCT_ICONS[p.cluster] || "💊";
                                        const topEfficacy = Object.entries(p.efficacy)
                                            .sort(([, a], [, b]) => b - a)
                                            .slice(0, 4);

                                        return (
                                            <motion.div
                                                key={p.name}
                                                className={styles.card}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: Math.min(idx * 0.04, 0.6), duration: 0.4 }}
                                                layout
                                            >
                                                {/* Product Visual */}
                                                <div className={styles.cardVisual} style={{ background: `linear-gradient(135deg, ${colors.bg} 0%, white 100%)` }}>
                                                    <span className={styles.cardIcon}>{icon}</span>
                                                    <div className={styles.cardOverlay}>
                                                        <Link href={`/product/${idx + 1}`} className={styles.viewBtn}>
                                                            Detayları Gör <ArrowRight size={14} />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* Card Content */}
                                                <div className={styles.cardBody}>
                                                    <div className={styles.cardMeta}>
                                                        <span
                                                            className={styles.clusterTag}
                                                            style={{ background: colors.bg, color: colors.text }}
                                                        >
                                                            {CLUSTER_LABELS[p.cluster] || p.cluster}
                                                        </span>
                                                    </div>
                                                    <h3 className={styles.productName}>{p.name}</h3>

                                                    {/* Efficacy Bars */}
                                                    <div className={styles.efficacy}>
                                                        <p className={styles.efficacyTitle}>Etkili Olduğu Alanlar</p>
                                                        {topEfficacy.map(([cat, val]) => (
                                                            <div key={cat} className={styles.efficacyRow}>
                                                                <div className={styles.efficacyInfo}>
                                                                    <span className={styles.efficacyName}>{EFFICACY_LABELS[cat] || cat}</span>
                                                                    <span className={styles.efficacyPercent}>{(val * 100).toFixed(0)}%</span>
                                                                </div>
                                                                <div className={styles.barTrack}>
                                                                    <motion.div
                                                                        className={styles.barFill}
                                                                        style={{
                                                                            background: val >= 0.8
                                                                                ? `linear-gradient(90deg, ${colors.accent}, ${colors.text})`
                                                                                : `linear-gradient(90deg, #cbd5e1, #94a3b8)`
                                                                        }}
                                                                        initial={{ width: 0 }}
                                                                        whileInView={{ width: `${val * 100}%` }}
                                                                        viewport={{ once: true }}
                                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Warning + CTA */}
                                                    <div className={styles.cardFooter}>
                                                        {p.blacklist && p.blacklist.length > 0 && (
                                                            <div className={styles.warning}>
                                                                <AlertCircle size={13} />
                                                                <span>Kısıtlamalar mevcut</span>
                                                            </div>
                                                        )}
                                                        <button className={styles.addBtn}>
                                                            Paketime Ekle
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
