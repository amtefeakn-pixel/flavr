import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import styles from "./page.module.css";
import { FlaskConical, Target, RefreshCw, Star } from "lucide-react";

export const metadata = {
    alternates: { canonical: "https://flavr.com.tr" },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <ProductShowcase />

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50.000+</span>
              <span className={styles.statLabel}>Mutlu Müşteri</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9/5</span>
              <span className={styles.statLabel}>Ortalama Puan</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statLabel}>Uzman Doktor</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>%98</span>
              <span className={styles.statLabel}>Memnuniyet Oranı</span>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Biz? Section */}
      <section className="section container">
        <h2 className={`${styles.sectionTitle} text-center`}>Neden Biz?</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ "--icon-color": "#3b82f6" }}>
              <FlaskConical size={28} />
            </div>
            <h3>VERİ ODAKLI BİLİM</h3>
            <p>Tavsiyelerimiz genel formüllere değil, sizin yanıtlarınıza, yaşam tarzınıza ve güncel bilimsel araştırmalara dayanır. Uzman doktorlar ve diyetisyenler formülasyon süreçlerimizin her adımında yer alır.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ "--icon-color": "#f59e0b" }}>
              <Target size={28} />
            </div>
            <h3>KİŞİYE ÖZEL ETKİNLİK</h3>
            <p>Gereksiz takviyeleri eliyoruz. İhtiyacınız olan tam günlük dozajı, isminize özel basılmış pratik günlük poşetlerde sunuyoruz. Karışıklık yok, sadece size özel sağlık.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} style={{ "--icon-color": "#10b981" }}>
              <RefreshCw size={28} />
            </div>
            <h3>YENİLENEN KOLAYLIK</h3>
            <p>30 günlük otomatik teslimat ile vitaminleriniz asla bitmez. Müşteri panelinizden tek tıkla gönderimi erteleyebilir, atlayabilir veya iptal edebilirsiniz. Kontrol tamamen sizde.</p>
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section className={styles.reviews}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} text-center`}>Müşterilerimiz Ne Diyor?</h2>
          <div className={styles.reviewsGrid}>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className={styles.reviewText}>"3 aydır kullanıyorum, enerji seviyem gözle görülür şekilde arttı. Sabahları artık çok daha dinç uyanıyorum."</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>AK</div>
                <div>
                  <strong>Ayşe K.</strong>
                  <span>İstanbul · 3 aydır müşteri</span>
                </div>
              </div>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className={styles.reviewText}>"Kişiselleştirilmiş paket fikri harika. Sonunda ihtiyacım olan tam formülü aldım, gereksiz vitamin almak zorunda kalmıyorum."</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>MT</div>
                <div>
                  <strong>Mehmet T.</strong>
                  <span>Ankara · 5 aydır müşteri</span>
                </div>
              </div>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className={styles.reviewText}>"Teslimat çok hızlı, paketleme kaliteli. Müşteri hizmetleri de gerçekten yardımcı oluyor. Kesinlikle tavsiye ederim."</p>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>ZY</div>
                <div>
                  <strong>Zeynep Y.</strong>
                  <span>İzmir · 2 aydır müşteri</span>
                </div>
              </div>
            </div>
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
