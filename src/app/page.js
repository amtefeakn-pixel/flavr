import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <ProductShowcase />

      {/* Neden Biz? Section */}
      <section className="section container">
        <h2 className={`${styles.sectionTitle} text-center`}>Neden Biz?</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>VERİ ODAKLI BİLİM</h3>
            <p>Tavsiyelerimiz genel formüllere değil, sizin yanıtlarınıza, yaşam tarzınıza ve güncel bilimsel araştırmalara dayanır. Uzman doktorlar ve diyetisyenler formülasyon süreçlerimizin her adımında yer alır.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>KİŞİYE ÖZEL ETKİNLİK</h3>
            <p>Gereksiz takviyeleri eliyoruz. İhtiyacınız olan tam günlük dozajı, isminize özel basılmış pratik günlük poşetlerde sunuyoruz. Karışıklık yok, sadece size özel sağlık.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>YENİLENEN KOLAYLIK</h3>
            <p>30 günlük otomatik teslimat ile vitaminleriniz asla bitmez. Müşteri panelinizden tek tıkla gönderimi erteleyebilir, atlayabilir veya iptal edebilirsiniz. Kontrol tamamen sizde.</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyCard}>
            <div className={styles.storyContent}>
              <h2>Hikayemiz</h2>
              <p>
                Sağlıklı yaşamın karmaşık olmaması gerektiğine inanıyoruz.
                Bu yüzden, sizin için en doğru vitaminleri bulmayı kolaylaştırdık.
                Bilim ve teknolojiyi birleştirerek, sağlığınıza değer katıyoruz.
              </p>
              <Link href="/about" className="btn btn-primary">Daha Fazla Oku</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
