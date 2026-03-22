import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <Image src="/logo.png" alt="Flavr Logo" width={500} height={175} className={styles.logoImage} />
                        </Link>
                        <p className={styles.mission}>
                            Bilimsel verilerle desteklenen, kişiselleştirilmiş vitamin paketleri ile sağlığınıza değer katın.
                        </p>
                        <div className={styles.social}>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.links}>
                        <h4>Keşfet</h4>
                        <Link href="/quiz">Testi Çöz</Link>
                        <Link href="/shop">Mağaza</Link>
                        <Link href="/about">Hakkımızda</Link>
                        <Link href="/blog">Blog</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>Destek</h4>
                        <Link href="/faq">SSS</Link>
                        <Link href="/contact">İletişim</Link>
                        <Link href="/shipping-returns">Kargo & İade</Link>
                        <Link href="/privacy">Gizlilik Politikası</Link>
                    </div>

                    <div className={styles.newsletter}>
                        <h4>Bültenimize Abone Olun</h4>
                        <p>Sağlıklı yaşam ipuçları ve özel teklifler için.</p>
                        <form className={styles.form}>
                            <input type="email" placeholder="E-posta adresiniz" required />
                            <button type="submit" className="btn btn-primary">Abone Ol</button>
                        </form>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Flavr. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
