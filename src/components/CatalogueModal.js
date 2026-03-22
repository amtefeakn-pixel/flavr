"use client";
import { useState, useMemo } from "react";
import { X, Search, AlertCircle, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CatalogueModal.module.css";
import { ALL_PRODUCTS } from "@/lib/bioMatchCore";

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

export default function CatalogueModal({ isOpen, onClose }) {
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

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerLeft}>
                                <div className={styles.titleIcon}>
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h2 className={styles.title}>Vitamin Kataloğu</h2>
                                    <p className={styles.subtitle}>
                                        {filteredProducts.length} ürün listeleniyor
                                    </p>
                                </div>
                            </div>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search & Filters */}
                        <div className={styles.toolbar}>
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

                            <div className={styles.filterRow}>
                                <Filter size={14} className={styles.filterIcon} />
                                <div className={styles.clusterTabs}>
                                    {clusters.map(cluster => (
                                        <button
                                            key={cluster}
                                            className={`${styles.clusterTab} ${activeCluster === cluster ? styles.activeTab : ""}`}
                                            onClick={() => setActiveCluster(cluster)}
                                        >
                                            {CLUSTER_LABELS[cluster] || cluster}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={styles.content}>
                            {filteredProducts.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <Search size={48} strokeWidth={1} />
                                    <p>Aramanızla eşleşen ürün bulunamadı.</p>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {filteredProducts.map((p, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={styles.card}
                                            data-cluster={p.cluster}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                                        >
                                            <div className={styles.cardAccent} />
                                            <div className={styles.cardInner}>
                                                <div className={styles.cardHeader}>
                                                    <h3 className={styles.productName}>{p.name}</h3>
                                                    <span className={styles.clusterTag}>{CLUSTER_LABELS[p.cluster] || p.cluster}</span>
                                                </div>

                                                <div className={styles.efficacySection}>
                                                    <p className={styles.detailTitle}>Etkili Olduğu Alanlar</p>
                                                    <div className={styles.efficacyBars}>
                                                        {Object.entries(p.efficacy)
                                                            .sort(([, a], [, b]) => b - a)
                                                            .slice(0, 4)
                                                            .map(([cat, val]) => (
                                                                <div key={cat} className={styles.efficacyItem}>
                                                                    <div className={styles.efficacyLabel}>
                                                                        <span className={styles.efficacyName}>{EFFICACY_LABELS[cat] || cat}</span>
                                                                        <span className={styles.efficacyValue}>{(val * 100).toFixed(0)}%</span>
                                                                    </div>
                                                                    <div className={styles.efficacyTrack}>
                                                                        <div
                                                                            className={`${styles.efficacyFill} ${val >= 0.8 ? styles.highFill : ""}`}
                                                                            style={{ width: `${val * 100}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                                {p.blacklist && p.blacklist.length > 0 && (
                                                    <div className={styles.blacklistWarning}>
                                                        <AlertCircle size={14} />
                                                        <span>Kısıtlamalar mevcut</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
