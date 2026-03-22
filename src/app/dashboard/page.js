"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutGrid, Package, Heart, Truck, CreditCard, Gift,
    LogOut, ChevronRight, Pause, CalendarClock, Edit3,
    RotateCcw, MapPin, Plus, Copy, Star, Menu, X,
    Sun, Moon as MoonIcon, Droplets, Shield, Zap, Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./dashboard.module.css";

const TABS = [
    { id: "overview", label: "Rutinim", icon: LayoutGrid },
    { id: "subscription", label: "Abonelik", icon: Package },
    { id: "health", label: "Sağlık Profili", icon: Heart },
    { id: "orders", label: "Siparişler", icon: Truck },
    { id: "payment", label: "Ödeme & Adres", icon: CreditCard },
    { id: "rewards", label: "FLAVR Ödüller", icon: Gift },
];

// Mock data for the dashboard
const MOCK_PACK = [
    { name: "B-Complex (Methylated)", dosage: "1 kapsül", time: "Sabah", icon: "💊", color: "#0ea5e9" },
    { name: "Vitamin D3 + K2", dosage: "1 softgel", time: "Sabah", icon: "☀️", color: "#f59e0b" },
    { name: "Magnesium Bisglycinate", dosage: "2 kapsül", time: "Akşam", icon: "🌙", color: "#6366f1" },
    { name: "Omega-3 (High EPA)", dosage: "1 softgel", time: "Öğle", icon: "🐟", color: "#0891b2" },
    { name: "Ashwagandha (KSM-66)", dosage: "1 kapsül", time: "Akşam", icon: "🌿", color: "#22c55e" },
];

const MOCK_ORDERS = [
    { id: "FLV-2026-0847", date: "15 Mar 2026", status: "Yolda", total: "₺489", tracking: "TR9283746521" },
    { id: "FLV-2026-0712", date: "15 Şub 2026", status: "Teslim Edildi", total: "₺489", tracking: "TR8172635490" },
    { id: "FLV-2026-0583", date: "15 Oca 2026", status: "Teslim Edildi", total: "₺459", tracking: "TR7261534089" },
];

const HEALTH_SCORES = [
    { label: "Enerji Üretimi", score: 0.85, icon: Zap, color: "#f59e0b" },
    { label: "Stres Yönetimi", score: 0.72, icon: Shield, color: "#6366f1" },
    { label: "Uyku Kalitesi", score: 0.68, icon: MoonIcon, color: "#8b5cf6" },
    { label: "Bağışıklık", score: 0.90, icon: Droplets, color: "#0ea5e9" },
    { label: "Bilişsel Fonksiyon", score: 0.76, icon: Brain, color: "#ec4899" },
    { label: "Sindirim", score: 0.60, icon: Sun, color: "#22c55e" },
];

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (status === "loading") {
        return (
            <div className={styles.loadingPage}>
                <div className={styles.loadingSpinner} />
            </div>
        );
    }

    if (status === "unauthenticated") {
        router.push("/signin");
        return null;
    }

    const firstName = session?.user?.name?.split(" ")[0] || "Kullanıcı";

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ""}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/" className={styles.sidebarLogo}>
                        <Image src="/logo.png" alt="Flavr" width={600} height={150} className={styles.logoImg} priority />
                    </Link>
                    <button className={styles.closeSidebar} onClick={() => setMobileMenuOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.userCard}>
                    <div className={styles.avatar}>
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{session?.user?.name}</p>
                        <p className={styles.userEmail}>{session?.user?.email}</p>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.navItem} ${activeTab === tab.id ? styles.navItemActive : ""}`}
                            onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <button
                        className={styles.signOutBtn}
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut size={16} />
                        <span>Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {mobileMenuOpen && <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />}

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.topBar}>
                    <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={22} />
                    </button>
                    <div>
                        <h1 className={styles.greeting}>Merhaba, {firstName}</h1>
                        <p className={styles.greetingSub}>
                            {TABS.find(t => t.id === activeTab)?.label}
                        </p>
                    </div>
                    <Link href="/" className={styles.backToSite}>
                        Siteye Dön <ChevronRight size={14} />
                    </Link>
                </header>

                <div className={styles.content}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                        >
                            {activeTab === "overview" && <OverviewTab />}
                            {activeTab === "subscription" && <SubscriptionTab />}
                            {activeTab === "health" && <HealthTab />}
                            {activeTab === "orders" && <OrdersTab />}
                            {activeTab === "payment" && <PaymentTab />}
                            {activeTab === "rewards" && <RewardsTab userName={session?.user?.name} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

/* ═══════════════ TAB COMPONENTS ═══════════════ */

function OverviewTab() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Günlük Paketim</h2>
                <p className={styles.sectionSub}>5 supplement &middot; Kişiselleştirilmiş formül</p>
            </div>

            <div className={styles.packGrid}>
                {MOCK_PACK.map((item, i) => (
                    <div key={i} className={styles.packCard}>
                        <div className={styles.packIcon} style={{ background: `${item.color}15` }}>
                            <span>{item.icon}</span>
                        </div>
                        <div className={styles.packInfo}>
                            <h4 className={styles.packName}>{item.name}</h4>
                            <p className={styles.packDosage}>{item.dosage} &middot; {item.time}</p>
                        </div>
                        <div className={styles.packTimeBadge} style={{ color: item.color, background: `${item.color}12` }}>
                            {item.time}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                    <div className={styles.infoCardIcon} style={{ background: "#fef3c7", color: "#b45309" }}>
                        <Sun size={20} />
                    </div>
                    <div>
                        <h4 className={styles.infoCardTitle}>Sabah Rutini</h4>
                        <p className={styles.infoCardDesc}>B-Complex + D3+K2 — Kahvaltıdan sonra alın</p>
                    </div>
                </div>
                <div className={styles.infoCard}>
                    <div className={styles.infoCardIcon} style={{ background: "#eef2ff", color: "#4338ca" }}>
                        <MoonIcon size={20} />
                    </div>
                    <div>
                        <h4 className={styles.infoCardTitle}>Akşam Rutini</h4>
                        <p className={styles.infoCardDesc}>Magnezyum + Ashwagandha — Yatmadan 30dk önce</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubscriptionTab() {
    const [subStatus, setSubStatus] = useState("active");

    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Abonelik Yönetimi</h2>
                <p className={styles.sectionSub}>Sonraki gönderim: 15 Nisan 2026</p>
            </div>

            <div className={styles.statusBanner}>
                <div className={`${styles.statusDot} ${subStatus === "active" ? styles.statusActive : styles.statusPaused}`} />
                <span className={styles.statusText}>
                    {subStatus === "active" ? "Abonelik Aktif" : "Abonelik Duraklatıldı"}
                </span>
                <span className={styles.statusPlan}>Aylık Plan — ₺489/ay</span>
            </div>

            <div className={styles.actionGrid}>
                <button className={styles.actionCard} onClick={() => setSubStatus(subStatus === "active" ? "paused" : "active")}>
                    <Pause size={22} />
                    <span className={styles.actionLabel}>
                        {subStatus === "active" ? "Aboneliği Duraklat" : "Aboneliği Devam Ettir"}
                    </span>
                    <p className={styles.actionDesc}>İstediğiniz zaman devam ettirin</p>
                </button>
                <button className={styles.actionCard}>
                    <CalendarClock size={22} />
                    <span className={styles.actionLabel}>Gönderimi Ertele</span>
                    <p className={styles.actionDesc}>Sonraki gönderimi 1-4 hafta erteleyin</p>
                </button>
                <button className={styles.actionCard}>
                    <Edit3 size={22} />
                    <span className={styles.actionLabel}>Paketi Düzenle</span>
                    <p className={styles.actionDesc}>Supplement ekle veya çıkar</p>
                </button>
            </div>
        </div>
    );
}

function HealthTab() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Sağlık Profili</h2>
                <p className={styles.sectionSub}>Son değerlendirme: 10 Mart 2026</p>
            </div>

            <div className={styles.scoreGrid}>
                {HEALTH_SCORES.map((item, i) => (
                    <div key={i} className={styles.scoreCard}>
                        <div className={styles.scoreIcon} style={{ background: `${item.color}15`, color: item.color }}>
                            <item.icon size={20} />
                        </div>
                        <div className={styles.scoreInfo}>
                            <div className={styles.scoreHeader}>
                                <span className={styles.scoreLabel}>{item.label}</span>
                                <span className={styles.scoreValue}>{(item.score * 100).toFixed(0)}%</span>
                            </div>
                            <div className={styles.scoreTrack}>
                                <div
                                    className={styles.scoreFill}
                                    style={{ width: `${item.score * 100}%`, background: item.color }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/quiz" className={styles.retakeBtn}>
                <RotateCcw size={16} />
                Sağlık Değerlendirmesini Tekrarla
            </Link>
        </div>
    );
}

function OrdersTab() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Sipariş Geçmişi</h2>
                <p className={styles.sectionSub}>{MOCK_ORDERS.length} sipariş</p>
            </div>

            <div className={styles.orderList}>
                {MOCK_ORDERS.map((order, i) => (
                    <div key={i} className={styles.orderCard}>
                        <div className={styles.orderMain}>
                            <div>
                                <p className={styles.orderId}>{order.id}</p>
                                <p className={styles.orderDate}>{order.date}</p>
                            </div>
                            <div className={styles.orderRight}>
                                <span className={`${styles.orderStatus} ${order.status === "Yolda" ? styles.statusShipping : styles.statusDelivered}`}>
                                    {order.status}
                                </span>
                                <span className={styles.orderTotal}>{order.total}</span>
                            </div>
                        </div>
                        <div className={styles.orderActions}>
                            <button className={styles.orderBtn}>
                                <Truck size={14} /> Kargo Takip
                            </button>
                            <button className={styles.orderBtn}>
                                Fatura İndir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PaymentTab() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Ödeme & Adresler</h2>
            </div>

            {/* Cards */}
            <div className={styles.paySubSection}>
                <div className={styles.paySubHeader}>
                    <h3 className={styles.paySubTitle}>Kayıtlı Kartlar</h3>
                    <button className={styles.addBtn}><Plus size={14} /> Kart Ekle</button>
                </div>
                <div className={styles.cardItem}>
                    <div className={styles.cardVisual}>
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <p className={styles.cardNumber}>•••• •••• •••• 4242</p>
                        <p className={styles.cardMeta}>Visa &middot; 12/28</p>
                    </div>
                    <span className={styles.defaultBadge}>Varsayılan</span>
                </div>
            </div>

            {/* Addresses */}
            <div className={styles.paySubSection}>
                <div className={styles.paySubHeader}>
                    <h3 className={styles.paySubTitle}>Teslimat Adresleri</h3>
                    <button className={styles.addBtn}><Plus size={14} /> Adres Ekle</button>
                </div>
                <div className={styles.addressItem}>
                    <MapPin size={18} className={styles.addressIcon} />
                    <div>
                        <p className={styles.addressTitle}>Ev Adresi</p>
                        <p className={styles.addressLine}>Örnek Mah. Sağlık Sok. No:12 D:4, Kadıköy / İstanbul 34710</p>
                    </div>
                    <span className={styles.defaultBadge}>Varsayılan</span>
                </div>
            </div>
        </div>
    );
}

function RewardsTab({ userName }) {
    const [copied, setCopied] = useState(false);
    const referralCode = "FLAVR-" + (userName?.split(" ")[0]?.toUpperCase() || "USER") + "25";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>FLAVR Ödüller</h2>
                <p className={styles.sectionSub}>Puan kazanın, indirim yakalayın</p>
            </div>

            <div className={styles.rewardsBanner}>
                <div className={styles.pointsCircle}>
                    <Star size={24} />
                    <span className={styles.pointsValue}>1,250</span>
                    <span className={styles.pointsLabel}>Puan</span>
                </div>
                <div className={styles.rewardsInfo}>
                    <h3 className={styles.rewardsTitle}>Gold Üye</h3>
                    <p className={styles.rewardsDesc}>750 puan daha kazanarak Platinum seviyesine ulaşın</p>
                    <div className={styles.tierTrack}>
                        <div className={styles.tierFill} style={{ width: "62.5%" }} />
                    </div>
                    <div className={styles.tierLabels}>
                        <span>Silver</span>
                        <span style={{ fontWeight: 700, color: "var(--corporate-blue)" }}>Gold</span>
                        <span>Platinum</span>
                    </div>
                </div>
            </div>

            <div className={styles.referralCard}>
                <Gift size={22} className={styles.referralIcon} />
                <div>
                    <h4 className={styles.referralTitle}>Arkadaşını Davet Et</h4>
                    <p className={styles.referralDesc}>Her davet için 200 puan kazanın, arkadaşınız %15 indirim alsın</p>
                </div>
                <div className={styles.referralCode}>
                    <code>{referralCode}</code>
                    <button className={styles.copyBtn} onClick={handleCopy}>
                        <Copy size={14} />
                        {copied ? "Kopyalandı!" : "Kopyala"}
                    </button>
                </div>
            </div>
        </div>
    );
}
