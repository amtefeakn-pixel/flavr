"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
    LayoutDashboard, Package, ShoppingCart, BarChart2,
    Users, Settings, Search, Bell, LogOut, Edit2, Trash2,
    Plus, X, TrendingUp, TrendingDown, AlertTriangle,
    CheckCircle, Clock, Truck, Menu, ChevronRight,
    Star, Zap, Activity, DollarSign
} from "lucide-react";
import styles from "./admin.module.css";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const INITIAL_PRODUCTS = [
    { id: 1, name: "D3 + K2 Vitamini", category: "Temel", price: 249, stock: 142, effectiveness: 95, image: "💊", active: true },
    { id: 2, name: "Omega-3 Balık Yağı", category: "Temel", price: 299, stock: 8, effectiveness: 88, image: "🐟", active: true },
    { id: 3, name: "Magnezyum Glisinaat", category: "Magnezyum", price: 219, stock: 67, effectiveness: 92, image: "💎", active: true },
    { id: 4, name: "B-Complex (Methylated)", category: "Temel", price: 279, stock: 54, effectiveness: 90, image: "⚡", active: true },
    { id: 5, name: "Vitamin C + Bioflavonoidler", category: "Temel", price: 189, stock: 203, effectiveness: 87, image: "🍊", active: true },
    { id: 6, name: "Çinko Bisglisinat", category: "Mineral", price: 199, stock: 5, effectiveness: 85, image: "🔬", active: true },
    { id: 7, name: "Ashwagandha KSM-66", category: "Özel", price: 349, stock: 31, effectiveness: 91, image: "🌿", active: false },
    { id: 8, name: "Koenzim Q10", category: "Özel", price: 389, stock: 19, effectiveness: 89, image: "🔋", active: true },
];

const INITIAL_ORDERS = [
    { id: "FLV-1042", customer: "Ahmet Yılmaz", email: "ahmet@email.com", date: "23 Mar 2026", total: 748, status: "Teslim Edildi", items: 3 },
    { id: "FLV-1041", customer: "Zeynep Kaya", email: "zeynep@email.com", date: "23 Mar 2026", total: 299, status: "Kargoda", items: 1 },
    { id: "FLV-1040", customer: "Mert Demir", email: "mert@email.com", date: "22 Mar 2026", total: 467, status: "Hazırlanıyor", items: 2 },
    { id: "FLV-1039", customer: "Elif Şahin", email: "elif@email.com", date: "22 Mar 2026", total: 1038, status: "Teslim Edildi", items: 4 },
    { id: "FLV-1038", customer: "Can Öztürk", email: "can@email.com", date: "21 Mar 2026", total: 249, status: "Teslim Edildi", items: 1 },
    { id: "FLV-1037", customer: "Selin Arslan", email: "selin@email.com", date: "21 Mar 2026", total: 598, status: "Kargoda", items: 2 },
    { id: "FLV-1036", customer: "Burak Çelik", email: "burak@email.com", date: "20 Mar 2026", total: 349, status: "Hazırlanıyor", items: 1 },
    { id: "FLV-1035", customer: "Ayşe Koç", email: "ayse@email.com", date: "20 Mar 2026", total: 847, status: "Teslim Edildi", items: 3 },
];

const MOCK_USERS = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@email.com", joined: "10 Oca 2026", orders: 5, subscription: "Aktif", role: "user" },
    { id: 2, name: "Zeynep Kaya", email: "zeynep@email.com", joined: "15 Oca 2026", orders: 2, subscription: "Aktif", role: "user" },
    { id: 3, name: "Mert Demir", email: "mert@email.com", joined: "22 Şub 2026", orders: 1, subscription: "Pasif", role: "user" },
    { id: 4, name: "Elif Şahin", email: "elif@email.com", joined: "3 Mar 2026", orders: 4, subscription: "Aktif", role: "user" },
    { id: 5, name: "Can Öztürk", email: "can@email.com", joined: "5 Mar 2026", orders: 3, subscription: "Aktif", role: "user" },
];

const QUIZ_ANALYTICS = {
    topGoals: [
        { label: "Enerji & Vitalite", count: 847, pct: 92 },
        { label: "Bağışıklık Güçlendirme", count: 721, pct: 78 },
        { label: "Stres Yönetimi", count: 634, pct: 69 },
        { label: "Uyku Kalitesi", count: 512, pct: 56 },
        { label: "Bilişsel Performans", count: 398, pct: 43 },
    ],
    deficiencies: [
        { label: "D3 Vitamini", pct: 74 },
        { label: "Magnezyum", pct: 61 },
        { label: "B12 Vitamini", pct: 48 },
        { label: "Omega-3", pct: 42 },
        { label: "Çinko", pct: 35 },
    ],
    weeklyQuizzes: [38, 52, 61, 74, 68, 89, 95],
    completionRate: 78,
};

const STATUS_OPTIONS = ["Hazırlanıyor", "Kargoda", "Teslim Edildi"];

// ─── Sub‑components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, trend, color }) {
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: color + "22", color }}>
                <Icon size={22} />
            </div>
            <div className={styles.statBody}>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statValue}>{value}</span>
                {sub && (
                    <span className={`${styles.statSub} ${trend === "up" ? styles.trendUp : trend === "down" ? styles.trendDown : ""}`}>
                        {trend === "up" && <TrendingUp size={12} />}
                        {trend === "down" && <TrendingDown size={12} />}
                        {sub}
                    </span>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const map = {
        "Teslim Edildi": styles.badgeGreen,
        "Kargoda": styles.badgeBlue,
        "Hazırlanıyor": styles.badgeYellow,
    };
    return <span className={`${styles.badge} ${map[status] || ""}`}>{status}</span>;
}

function BarChart({ data, max, color }) {
    return (
        <div className={styles.barChart}>
            {data.map((v, i) => (
                <div key={i} className={styles.barWrap}>
                    <div className={styles.bar} style={{ height: `${(v / max) * 100}%`, background: color }} />
                </div>
            ))}
        </div>
    );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function OverviewTab({ products, orders }) {
    const lowStock = products.filter(p => p.stock < 10).length;
    const todayOrders = orders.filter(o => o.date.includes("23 Mar")).length;
    const revenue = orders.reduce((s, o) => s + o.total, 0);

    return (
        <div className={styles.tabContent}>
            <div className={styles.statsGrid}>
                <StatCard icon={DollarSign} label="Toplam Gelir" value={`₺${revenue.toLocaleString("tr-TR")}`} sub="+12% bu ay" trend="up" color="#fea6a6" />
                <StatCard icon={Star} label="Aktif Aboneler" value="384" sub="+28 bu hafta" trend="up" color="#a8d5ba" />
                <StatCard icon={Users} label="Bugün Kayıt" value={String(todayOrders)} sub="Toplam 1.240 kullanıcı" color="#7ec8e3" />
                <StatCard icon={AlertTriangle} label="Düşük Stok" value={String(lowStock)} sub="Acil sipariş gerekiyor" trend="down" color="#f59e0b" />
            </div>

            <div className={styles.overviewRow}>
                <div className={styles.chartCard}>
                    <h3 className={styles.cardTitle}>Haftalık Sipariş Trendi</h3>
                    <BarChart data={QUIZ_ANALYTICS.weeklyQuizzes} max={100} color="#fea6a6" />
                    <div className={styles.barLabels}>
                        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(d => (
                            <span key={d}>{d}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.recentCard}>
                    <h3 className={styles.cardTitle}>Son Siparişler</h3>
                    <div className={styles.recentList}>
                        {orders.slice(0, 5).map(o => (
                            <div key={o.id} className={styles.recentItem}>
                                <div className={styles.recentAvatar}>{o.customer[0]}</div>
                                <div className={styles.recentInfo}>
                                    <span className={styles.recentName}>{o.customer}</span>
                                    <span className={styles.recentMeta}>{o.id} · {o.date}</span>
                                </div>
                                <div className={styles.recentRight}>
                                    <span className={styles.recentAmount}>₺{o.total}</span>
                                    <StatusBadge status={o.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.alertsCard}>
                <h3 className={styles.cardTitle}><AlertTriangle size={16} /> Stok Uyarıları</h3>
                <div className={styles.alertList}>
                    {products.filter(p => p.stock < 10).map(p => (
                        <div key={p.id} className={styles.alertItem}>
                            <span className={styles.alertEmoji}>{p.image}</span>
                            <span className={styles.alertName}>{p.name}</span>
                            <span className={styles.alertStock}>{p.stock} adet kaldı</span>
                            <span className={styles.alertBadge}>Kritik</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OrdersTab({ orders, setOrders }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Tümü");

    const filtered = orders.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "Tümü" || o.status === filter;
        return matchSearch && matchFilter;
    });

    const updateStatus = (id, status) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.tableToolbar}>
                <div className={styles.searchBox}>
                    <Search size={16} />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Sipariş no veya müşteri ara..."
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.filterGroup}>
                    {["Tümü", ...STATUS_OPTIONS].map(s => (
                        <button
                            key={s}
                            className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ""}`}
                            onClick={() => setFilter(s)}
                        >{s}</button>
                    ))}
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sipariş No</th>
                            <th>Müşteri</th>
                            <th>Tarih</th>
                            <th>Ürün</th>
                            <th>Toplam</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(o => (
                            <tr key={o.id}>
                                <td><span className={styles.orderId}>{o.id}</span></td>
                                <td>
                                    <div className={styles.customerCell}>
                                        <div className={styles.customerAvatar}>{o.customer[0]}</div>
                                        <div>
                                            <div className={styles.customerName}>{o.customer}</div>
                                            <div className={styles.customerEmail}>{o.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.muted}>{o.date}</td>
                                <td className={styles.muted}>{o.items} ürün</td>
                                <td className={styles.bold}>₺{o.total}</td>
                                <td>
                                    <select
                                        className={`${styles.statusSelect} ${
                                            o.status === "Teslim Edildi" ? styles.selectGreen :
                                            o.status === "Kargoda" ? styles.selectBlue : styles.selectYellow
                                        }`}
                                        value={o.status}
                                        onChange={e => updateStatus(o.id, e.target.value)}
                                    >
                                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className={styles.emptyState}>Sonuç bulunamadı.</div>
                )}
            </div>
        </div>
    );
}

function ProductsTab({ products, setProducts }) {
    const [editProduct, setEditProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const openEdit = (p) => { setEditProduct({ ...p }); setIsNew(false); setShowModal(true); };
    const openNew = () => {
        setEditProduct({ id: Date.now(), name: "", category: "Temel", price: 0, stock: 0, effectiveness: 80, image: "💊", active: true });
        setIsNew(true);
        setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditProduct(null); };

    const save = () => {
        if (!editProduct.name) return;
        if (isNew) {
            setProducts(prev => [...prev, editProduct]);
        } else {
            setProducts(prev => prev.map(p => p.id === editProduct.id ? editProduct : p));
        }
        closeModal();
    };

    const deleteProduct = (id) => {
        if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.tableToolbar}>
                <div>
                    <h3 className={styles.sectionTitle}>Ürün Kataloğu</h3>
                    <p className={styles.sectionSub}>{products.length} ürün listeleniyor</p>
                </div>
                <button className={styles.addBtn} onClick={openNew}>
                    <Plus size={16} /> Yeni Ürün
                </button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Ürün</th>
                            <th>Kategori</th>
                            <th>Fiyat</th>
                            <th>Stok</th>
                            <th>Etkinlik</th>
                            <th>Durum</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>
                                    <div className={styles.productCell}>
                                        <span className={styles.productEmoji}>{p.image}</span>
                                        <span className={styles.productName}>{p.name}</span>
                                    </div>
                                </td>
                                <td><span className={styles.categoryTag}>{p.category}</span></td>
                                <td className={styles.bold}>₺{p.price}</td>
                                <td>
                                    <span className={p.stock < 10 ? styles.stockLow : styles.stockOk}>
                                        {p.stock}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.effectBar}>
                                        <div className={styles.effectFill} style={{ width: `${p.effectiveness}%` }} />
                                        <span>{p.effectiveness}%</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={p.active ? styles.badgeGreen : styles.badgeGray}>
                                        {p.active ? "Aktif" : "Pasif"}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button className={styles.editBtn} onClick={() => openEdit(p)}><Edit2 size={14} /></button>
                                        <button className={styles.deleteBtn} onClick={() => deleteProduct(p.id)}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showModal && editProduct && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{isNew ? "Yeni Ürün Ekle" : "Ürünü Düzenle"}</h3>
                            <button className={styles.modalClose} onClick={closeModal}><X size={18} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formRow}>
                                <label>Ürün Adı</label>
                                <input
                                    className={styles.formInput}
                                    value={editProduct.name}
                                    onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))}
                                    placeholder="Ürün adı girin"
                                />
                            </div>
                            <div className={styles.formGrid}>
                                <div className={styles.formRow}>
                                    <label>Emoji / İkon</label>
                                    <input
                                        className={styles.formInput}
                                        value={editProduct.image}
                                        onChange={e => setEditProduct(p => ({ ...p, image: e.target.value }))}
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <label>Kategori</label>
                                    <select
                                        className={styles.formInput}
                                        value={editProduct.category}
                                        onChange={e => setEditProduct(p => ({ ...p, category: e.target.value }))}
                                    >
                                        {["Temel", "Magnezyum", "Mineral", "Özel"].map(c => (
                                            <option key={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formGrid}>
                                <div className={styles.formRow}>
                                    <label>Fiyat (₺)</label>
                                    <input
                                        type="number"
                                        className={styles.formInput}
                                        value={editProduct.price}
                                        onChange={e => setEditProduct(p => ({ ...p, price: Number(e.target.value) }))}
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <label>Stok Adedi</label>
                                    <input
                                        type="number"
                                        className={styles.formInput}
                                        value={editProduct.stock}
                                        onChange={e => setEditProduct(p => ({ ...p, stock: Number(e.target.value) }))}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <label>Etkinlik Oranı: %{editProduct.effectiveness}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    className={styles.formRange}
                                    value={editProduct.effectiveness}
                                    onChange={e => setEditProduct(p => ({ ...p, effectiveness: Number(e.target.value) }))}
                                />
                            </div>
                            <div className={styles.formRow}>
                                <label className={styles.checkLabel}>
                                    <input
                                        type="checkbox"
                                        checked={editProduct.active}
                                        onChange={e => setEditProduct(p => ({ ...p, active: e.target.checked }))}
                                    />
                                    Aktif (sitede görünsün)
                                </label>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={closeModal}>İptal</button>
                            <button className={styles.saveBtn} onClick={save}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function QuizTab() {
    const { topGoals, deficiencies, weeklyQuizzes, completionRate } = QUIZ_ANALYTICS;
    return (
        <div className={styles.tabContent}>
            <div className={styles.quizGrid}>
                <div className={styles.quizCard}>
                    <h3 className={styles.cardTitle}><Activity size={16} /> En Yaygın Hedefler</h3>
                    <div className={styles.goalList}>
                        {topGoals.map(g => (
                            <div key={g.label} className={styles.goalItem}>
                                <div className={styles.goalHeader}>
                                    <span>{g.label}</span>
                                    <span className={styles.muted}>{g.count} kullanıcı</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${g.pct}%`, background: "#fea6a6" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.quizCard}>
                    <h3 className={styles.cardTitle}><AlertTriangle size={16} /> Sık Görülen Eksiklikler</h3>
                    <div className={styles.goalList}>
                        {deficiencies.map(d => (
                            <div key={d.label} className={styles.goalItem}>
                                <div className={styles.goalHeader}>
                                    <span>{d.label}</span>
                                    <span className={styles.muted}>%{d.pct}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${d.pct}%`, background: "#a8d5ba" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.quizStatsRow}>
                <div className={styles.quizStatCard}>
                    <span className={styles.quizStatNum}>1.842</span>
                    <span className={styles.quizStatLabel}>Toplam Quiz</span>
                </div>
                <div className={styles.quizStatCard}>
                    <span className={styles.quizStatNum}>%{completionRate}</span>
                    <span className={styles.quizStatLabel}>Tamamlama Oranı</span>
                </div>
                <div className={styles.quizStatCard}>
                    <span className={styles.quizStatNum}>4:32</span>
                    <span className={styles.quizStatLabel}>Ort. Süre</span>
                </div>
                <div className={styles.quizStatCard}>
                    <span className={styles.quizStatNum}>89</span>
                    <span className={styles.quizStatLabel}>Bugün</span>
                </div>
            </div>
        </div>
    );
}

function UsersTab() {
    return (
        <div className={styles.tabContent}>
            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Kullanıcı</th>
                            <th>Kayıt Tarihi</th>
                            <th>Siparişler</th>
                            <th>Abonelik</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_USERS.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div className={styles.customerCell}>
                                        <div className={styles.customerAvatar}>{u.name[0]}</div>
                                        <div>
                                            <div className={styles.customerName}>{u.name}</div>
                                            <div className={styles.customerEmail}>{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.muted}>{u.joined}</td>
                                <td className={styles.bold}>{u.orders}</td>
                                <td>
                                    <span className={u.subscription === "Aktif" ? styles.badgeGreen : styles.badgeGray}>
                                        {u.subscription}
                                    </span>
                                </td>
                                <td><span className={styles.badgeBlue}>{u.role}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { key: "overview", label: "Genel Bakış", icon: LayoutDashboard },
    { key: "orders", label: "Siparişler", icon: ShoppingCart },
    { key: "products", label: "Ürün Yönetimi", icon: Package },
    { key: "quiz", label: "Quiz Analitik", icon: BarChart2 },
    { key: "users", label: "Kullanıcılar", icon: Users },
];

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [orders, setOrders] = useState(INITIAL_ORDERS);

    const activeNav = NAV_ITEMS.find(n => n.key === activeTab);

    return (
        <div className={styles.root}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? "" : styles.sidebarClosed}`}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.sidebarLogo}>FL<Zap size={18} />VR</span>
                    {sidebarOpen && <span className={styles.adminLabel}>Admin</span>}
                </div>

                <nav className={styles.nav}>
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            className={`${styles.navItem} ${activeTab === key ? styles.navActive : ""}`}
                            onClick={() => setActiveTab(key)}
                        >
                            <Icon size={18} />
                            {sidebarOpen && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <button className={styles.navItem} onClick={() => signOut({ callbackUrl: "/" })}>
                        <LogOut size={18} />
                        {sidebarOpen && <span>Çıkış Yap</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className={styles.main}>
                {/* Topbar */}
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <button className={styles.menuToggle} onClick={() => setSidebarOpen(o => !o)}>
                            <Menu size={20} />
                        </button>
                        <div className={styles.breadcrumb}>
                            <span>Admin</span>
                            <ChevronRight size={14} />
                            <span className={styles.breadcrumbActive}>{activeNav?.label}</span>
                        </div>
                    </div>
                    <div className={styles.topbarRight}>
                        <button className={styles.iconBtn}><Bell size={18} /></button>
                        <div className={styles.userPill}>
                            <div className={styles.userAvatar}>{session?.user?.name?.[0] ?? "A"}</div>
                            <span>{session?.user?.name ?? "Admin"}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className={styles.content}>
                    <div className={styles.pageHeader}>
                        <h1 className={styles.pageTitle}>{activeNav?.label}</h1>
                        <p className={styles.pageDate}>23 Mart 2026</p>
                    </div>

                    {activeTab === "overview" && <OverviewTab products={products} orders={orders} />}
                    {activeTab === "orders" && <OrdersTab orders={orders} setOrders={setOrders} />}
                    {activeTab === "products" && <ProductsTab products={products} setProducts={setProducts} />}
                    {activeTab === "quiz" && <QuizTab />}
                    {activeTab === "users" && <UsersTab />}
                </div>
            </div>
        </div>
    );
}
