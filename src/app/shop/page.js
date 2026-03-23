import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const products = [
    { id: 1, name: "Enerji Paketi", desc: "Güne zinde başlamak için B12 ve Demir desteği.", price: "150 TL", emoji: "⚡", color: "#F4A261" },
    { id: 2, name: "Uyku Destek", desc: "Rahat bir uyku için Magnezyum ve Melatonin.", price: "180 TL", emoji: "🌙", color: "#2A9D8F" },
    { id: 3, name: "Bağışıklık", desc: "Güçlü bir savunma için C Vitamini ve Çinko.", price: "160 TL", emoji: "🛡️", color: "#E76F51" },
    { id: 4, name: "Cilt & Saç", desc: "Parlak cilt ve güçlü saçlar için Biotin ve Kolajen.", price: "200 TL", emoji: "✨", color: "#E9C46A" },
    { id: 5, name: "Sindirim", desc: "Sağlıklı sindirim sistemi için Probiyotik karışım.", price: "140 TL", emoji: "🍃", color: "#2A9D8F" },
    { id: 6, name: "Odaklanma", desc: "Zihinsel berraklık için Omega-3 ve B Vitaminleri.", price: "170 TL", emoji: "🧠", color: "#264653" },
];

export default function Shop() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Tüm Ürünler</h1>
                        <p className={styles.subtitle}>Hedeflerinize yönelik bilimsel formüller ile hazırlanmış vitamin paketleri.</p>
                    </div>
                </div>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className={styles.card}>
                            <div className={styles.imageArea}>
                                <div className={styles.circle} style={{ backgroundColor: product.color }}>
                                    <span>{product.emoji}</span>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h3>{product.name}</h3>
                                <p>{product.desc}</p>
                                <div className={styles.bottom}>
                                    <span className={styles.price}>{product.price}</span>
                                    <span className={styles.detailBtn}>Detayları Gör</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
