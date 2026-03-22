import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { Check, Star } from "lucide-react";

export default async function ProductPage({ params }) {
    const { id } = await params;

    // Mock data fetching
    const product = {
        id,
        name: "Enerji Paketi",
        price: "150 TL",
        description: "Güne zinde başlamak için ihtiyacınız olan her şey.",
        benefits: [
            "Enerji seviyesini artırır",
            "Yorgunluğu azaltır",
            "Metabolizmayı destekler"
        ],
        ingredients: [
            { name: "B12 Vitamini", amount: "1000 mcg" },
            { name: "Demir", amount: "14 mg" },
            { name: "CoQ10", amount: "100 mg" }
        ]
    };

    return (
        <main className={styles.main}>
            <Header />
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.image}></div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{product.name}</h1>
                            <div className={styles.rating}>
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <span>(128 Değerlendirme)</span>
                            </div>
                        </div>

                        <p className={styles.price}>{product.price}</p>
                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.section}>
                            <h3>Faydaları</h3>
                            <ul className={styles.list}>
                                {product.benefits.map((b, i) => (
                                    <li key={i}><Check size={16} className={styles.check} /> {b}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <h3>İçindekiler</h3>
                            <div className={styles.ingredients}>
                                {product.ingredients.map((ing, i) => (
                                    <div key={i} className={styles.ingredient}>
                                        <span className={styles.ingName}>{ing.name}</span>
                                        <span className={styles.ingAmount}>{ing.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button className="btn btn-primary w-full">Sepete Ekle</button>
                            <p className={styles.shipping}>* 200 TL üzeri kargo bedava</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
