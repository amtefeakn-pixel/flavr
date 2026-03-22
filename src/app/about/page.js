"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Target, Beaker, ShieldCheck, Leaf, Users } from "lucide-react";
import styles from "./about.module.css";

const teamMembers = [
    { id: 1, name: "Dr. Ayşe Yılmaz", role: "Baş Beslenme Uzmanı", bio: "20 yıllık klinik deneyimi ile formüllerimizin arkasındaki bilimsel zeka. İstanbul Üniversitesi Tıp Fakültesi'nden mezun olduktan sonra, beslenme bilimleri alanında doktora çalışmasını tamamlamıştır." },
    { id: 2, name: "Prof. Dr. Mehmet Öz", role: "Bilim Kurulu Üyesi", bio: "Uluslararası alanda tanınan çalışmalarıyla ürün güvenliğimizi denetliyor. 50'den fazla hakemli dergide yayınlanmış araştırması bulunmaktadır." },
    { id: 3, name: "Dyt. Elif Demir", role: "Klinik Diyetisyen", bio: "Kişiselleştirilmiş beslenme planlarının oluşturulmasında uzman. 10.000'den fazla danışanla çalışma deneyimine sahiptir." },
];

const values = [
    { icon: Beaker, title: "Bilimsel Yaklaşım", desc: "Her formül, klinik araştırmalar ve kanıta dayalı verilerle geliştirilir." },
    { icon: ShieldCheck, title: "Şeffaflık", desc: "İçerik listelerimiz, dozaj bilgilerimiz ve kaynak seçimlerimiz tamamen açıktır." },
    { icon: Leaf, title: "Sürdürülebilirlik", desc: "Çevre dostu ambalaj ve sorumlu tedarik zinciri ile doğaya saygılı üretim." },
    { icon: Users, title: "Kişiye Özel", desc: "Tek tip çözümler yerine, her bireyin benzersiz ihtiyaçlarına göre formüller." },
];

export default function About() {
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <main>
            <Header />
            <div className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <motion.p
                        className={styles.heroLabel}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        FLAVR HAKKINDA
                    </motion.p>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Sağlığınızı Kişiselleştiriyoruz
                    </motion.h1>
                    <motion.p
                        className={styles.heroSub}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Bilim ve teknolojiyi birleştirerek, herkesin kendi sağlık
                        yolculuğunda en doğru adımları atmasını sağlıyoruz.
                    </motion.p>
                </section>

                {/* Vizyon & Misyon */}
                <section className={styles.vmSection}>
                    <div className={styles.vmGrid}>
                        <motion.div
                            className={styles.vmCard}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className={styles.vmIconWrap} style={{ background: "#eef2ff", color: "#4338ca" }}>
                                <Eye size={24} />
                            </div>
                            <h2 className={styles.vmTitle}>Vizyonumuz</h2>
                            <p className={styles.vmText}>
                                Önleyici sağlık alanında Türkiye'nin en güvenilir ve yenilikçi markası olmak.
                                Teknolojiyi ve bilimi harmanlayarak, her bireyin sağlık potansiyelini en üst
                                düzeye çıkarmak için çalışıyoruz.
                            </p>
                            <ul className={styles.vmList}>
                                <li>Kişiselleştirilmiş beslenme çözümlerinde lider olmak</li>
                                <li>Bilimsel araştırmaları erişilebilir hale getirmek</li>
                                <li>Toplum sağlığına sürdürülebilir katkı sağlamak</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className={styles.vmCard}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className={styles.vmIconWrap} style={{ background: "#fef3c7", color: "#b45309" }}>
                                <Target size={24} />
                            </div>
                            <h2 className={styles.vmTitle}>Misyonumuz</h2>
                            <p className={styles.vmText}>
                                Karmaşık sağlık dünyasını basitleştirerek, kişiye özel, bilimsel ve
                                erişilebilir vitamin çözümleri sunmak. Her bireyin sağlık yolculuğunun
                                benzersiz olduğuna inanıyoruz.
                            </p>
                            <ul className={styles.vmList}>
                                <li>Kanıta dayalı formüller geliştirmek</li>
                                <li>Şeffaf ve güvenilir içerik politikası izlemek</li>
                                <li>Erişilebilir fiyatlarla premium kalite sunmak</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Değerlerimiz */}
                <section className={styles.valuesSection}>
                    <h2 className={styles.sectionTitle}>Değerlerimiz</h2>
                    <p className={styles.sectionSub}>Her kararımızın arkasındaki temel ilkeler</p>
                    <div className={styles.valuesGrid}>
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <v.icon size={22} className={styles.valueIcon} />
                                <h3 className={styles.valueTitle}>{v.title}</h3>
                                <p className={styles.valueDesc}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Bilim Ekibi */}
                <section className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>Bilim Ekibimiz</h2>
                    <p className={styles.sectionSub}>Formüllerimizin arkasındaki uzmanlar</p>
                    <div className={styles.teamGrid}>
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                className={styles.teamCard}
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedMember(member)}
                            >
                                <div className={styles.teamAvatar}>
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className={styles.teamName}>{member.name}</h3>
                                <p className={styles.teamRole}>{member.role}</p>
                                <span className={styles.teamLink}>Profili Gör &rarr;</span>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Team Member Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={() => setSelectedMember(null)}>
                                <X size={20} />
                            </button>
                            <div className={styles.modalAvatar}>
                                {selectedMember.name.charAt(0)}
                            </div>
                            <h3 className={styles.modalName}>{selectedMember.name}</h3>
                            <p className={styles.modalRole}>{selectedMember.role}</p>
                            <p className={styles.modalBio}>{selectedMember.bio}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
        </main>
    );
}
