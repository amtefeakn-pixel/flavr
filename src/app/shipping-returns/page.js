import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingReturns() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Kargo ve İade Politikası</h1>

                <div style={{ background: "white", padding: "2rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                    <section style={{ marginBottom: "3rem" }}>
                        <h2 style={{ marginBottom: "1rem", color: "var(--text-main)" }}>Kargo Bilgileri</h2>
                        <p style={{ marginBottom: "1rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Siparişleriniz, ödeme onayının ardından en geç 3 iş günü içerisinde kargoya teslim edilir. Kargo takip numaranız, siparişiniz kargoya verildiğinde e-posta ve SMS yoluyla tarafınıza iletilecektir.
                        </p>
                        <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                            <li>200 TL ve üzeri siparişlerde kargo ücretsizdir.</li>
                            <li>Standart teslimat süresi 2-4 iş günüdür.</li>
                            <li>Hafta sonu ve resmi tatillerde verilen siparişler, takip eden ilk iş gününde işleme alınır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 style={{ marginBottom: "1rem", color: "var(--text-main)" }}>İade ve Değişim</h2>
                        <p style={{ marginBottom: "1rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Müşteri memnuniyeti bizim için önceliklidir. Satın aldığınız ürünlerden memnun kalmamanız durumunda, aşağıdaki koşullar çerçevesinde iade edebilirsiniz:
                        </p>
                        <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                            <li>İade süresi, ürünün teslim alındığı tarihten itibaren 14 gündür.</li>
                            <li>Ürünlerin ambalajı açılmamış, kullanılmamış ve yeniden satılabilir durumda olması gerekmektedir.</li>
                            <li>İade işlemini başlatmak için "Hesabım" sayfasından iade talebi oluşturabilirsiniz.</li>
                            <li>İade kargo ücreti, anlaşmalı kargo firmamız kullanıldığı takdirde tarafımızca karşılanır.</li>
                        </ul>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
