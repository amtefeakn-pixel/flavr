import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
    { q: "Kargo ücreti ne kadar?", a: "200 TL ve üzeri siparişlerinizde kargo ücretsizdir. Altındaki siparişler için sabit kargo ücreti uygulanır." },
    { q: "Siparişim ne zaman ulaşır?", a: "Siparişleriniz genellikle 1-3 iş günü içerisinde kargoya verilir ve bulunduğunuz bölgeye göre 2-4 iş günü içinde teslim edilir." },
    { q: "İade koşulları nelerdir?", a: "Açılmamış ve hasar görmemiş ürünleri, teslimat tarihinden itibaren 14 gün içinde iade edebilirsiniz." },
    { q: "Aboneliğimi nasıl iptal edebilirim?", a: "Hesabım sayfasından abonelik ayarlarınıza giderek dilediğiniz zaman iptal veya dondurma işlemi yapabilirsiniz." },
    { q: "Ürünleriniz helal sertifikalı mı?", a: "Evet, tüm ürünlerimiz helal sertifikalı içeriklerle üretilmektedir." },
    { q: "Hamilelik döneminde kullanabilir miyim?", a: "Hamilelik ve emzirme döneminde herhangi bir takviye kullanmadan önce mutlaka doktorunuza danışmanızı öneririz." },
    { q: "Ödeme seçenekleri nelerdir?", a: "Kredi kartı, banka kartı ve güvenli ödeme altyapıları ile ödeme yapabilirsiniz." },
    { q: "Kişiye özel paket nasıl hazırlanıyor?", a: "Quiz sonuçlarınıza göre, ihtiyaçlarınıza ve hedeflerinize en uygun vitaminleri seçerek size özel günlük paketler hazırlıyoruz." },
    { q: "Yan etkileri var mı?", a: "Ürünlerimiz doğal içeriklidir ancak herhangi bir rahatsızlık hissederseniz kullanımı bırakıp doktorunuza başvurunuz." },
    { q: "Yurtdışına gönderim var mı?", a: "Şu an için sadece Türkiye sınırları içerisine gönderim yapmaktayız." },
];

export default function FAQ() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Sıkça Sorulan Sorular</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {faqs.map((item, index) => (
                        <div key={index} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                            <div style={{ background: "rgba(124, 198, 249, 0.1)", padding: "1.5rem", fontWeight: "600", color: "var(--text-main)" }}>
                                {item.q}
                            </div>
                            <div style={{ padding: "1.5rem", background: "white", color: "var(--text-muted)", lineHeight: "1.6" }}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
