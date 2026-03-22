import Link from "next/link";
import styles from "./ProductShowcase.module.css";
import { ArrowRight } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Enerji Paketi",
        description: "Güne zinde başlamak için B12 ve Demir desteği.",
        price: "150 TL",
        color: "#F4A261"
    },
    {
        id: 2,
        name: "Uyku Destek",
        description: "Rahat bir uyku için Magnezyum ve Melatonin.",
        price: "180 TL",
        color: "#2A9D8F"
    },
    {
        id: 3,
        name: "Bağışıklık",
        description: "Güçlü bir savunma için C Vitamini ve Çinko.",
        price: "160 TL",
        color: "#E76F51"
    }
];

export default function ProductShowcase() {
    return (
        <section className={`section ${styles.showcase}`}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Hedefe Yönelik Paketler</h2>
                    <Link href="/shop" className={styles.viewAll}>
                        Tümünü Gör <ArrowRight size={16} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.card}>
                            <div className={styles.imageArea} style={{ backgroundColor: product.color + '20' }}>
                                <div className={styles.circle} style={{ backgroundColor: product.color }}></div>
                            </div>
                            <div className={styles.info}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className={styles.bottom}>
                                    <span className={styles.price}>{product.price}</span>
                                    <button className={styles.addBtn}>Sepete Ekle</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
