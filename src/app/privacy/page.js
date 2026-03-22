import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Gizlilik Politikası</h1>

                <div style={{ background: "white", padding: "2rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                    <p style={{ marginBottom: "2rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                        Flavr olarak, kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
                    </p>

                    <section style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "1rem" }}>1. Veri Toplama</h3>
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Sitemizi ziyaret ettiğinizde, sipariş verdiğinizde veya bültenimize abone olduğunuzda adınız, e-posta adresiniz, teslimat adresiniz ve ödeme bilgileriniz gibi kişisel verileri toplayabiliriz.
                        </p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "1rem" }}>2. Veri Kullanımı</h3>
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Toplanan veriler, siparişlerinizi işlemek, size özel teklifler sunmak, müşteri hizmetleri desteği sağlamak ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılır.
                        </p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "1rem" }}>3. KVKK Aydınlatma Metni</h3>
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla Flavr, kişisel verilerinizi mevzuata uygun olarak işlemektedir. Verileriniz, açık rızanız olmaksızın üçüncü şahıslarla paylaşılmamaktadır.
                        </p>
                    </section>

                    <section>
                        <h3 style={{ marginBottom: "1rem" }}>4. Çerezler</h3>
                        <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Sitemizde kullanıcı deneyimini geliştirmek ve site trafiğini analiz etmek amacıyla çerezler (cookies) kullanılmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
