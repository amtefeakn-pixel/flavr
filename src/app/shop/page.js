import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const products = [
    { id: 1, name: "Enerji Paketi", price: "150 TL", image: "#F4A261" },
    { id: 2, name: "Uyku Destek", price: "180 TL", image: "#2A9D8F" },
    { id: 3, name: "Bağışıklık", price: "160 TL", image: "#E76F51" },
    { id: 4, name: "Cilt & Saç", price: "200 TL", image: "#F4A261" },
    { id: 5, name: "Sindirim", price: "140 TL", image: "#2A9D8F" },
    { id: 6, name: "Odaklanma", price: "170 TL", image: "#E76F51" },
];

export default function Shop() {
    return (
        <main className={styles.main}>
            <Header />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Tüm Ürünler</h1>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className={styles.card}>
                            <div className={styles.image} style={{ backgroundColor: product.image }}></div>
                            <div className={styles.info}>
                                <h3>{product.name}</h3>
                                <span className={styles.price}>{product.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
