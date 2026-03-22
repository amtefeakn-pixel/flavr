"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Bize Ulaşın</h1>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="contact-grid">
                    <div>
                        <p style={{ marginBottom: "2rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                            Sorularınız, önerileriniz veya geri bildirimleriniz için bize her zaman ulaşabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır.
                        </p>

                        <div style={{ marginBottom: "2rem" }}>
                            <h3 style={{ marginBottom: "0.5rem" }}>E-posta</h3>
                            <p style={{ color: "var(--text-muted)" }}>destek@flavr.com</p>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: "0.5rem" }}>Canlı Destek</h3>
                            <p style={{ color: "var(--text-muted)" }}>Hafta içi 09:00 - 18:00 saatleri arasında aktiftir.</p>
                        </div>
                    </div>

                    <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Adınız Soyadınız</label>
                            <input type="text" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius)", border: "1px solid var(--border)" }} placeholder="Adınız" />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>E-posta Adresiniz</label>
                            <input type="email" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius)", border: "1px solid var(--border)" }} placeholder="ornek@email.com" />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Mesajınız</label>
                            <textarea rows="5" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius)", border: "1px solid var(--border)", fontFamily: "inherit" }} placeholder="Mesajınızı buraya yazın..."></textarea>
                        </div>

                        <button type="button" className="btn" style={{ backgroundColor: "var(--action-orange)", color: "white" }}>Gönder</button>
                    </form>
                </div>
            </div>
            <style jsx>{`
              @media (max-width: 768px) {
                .contact-grid {
                  grid-template-columns: 1fr !important;
                  gap: 2rem !important;
                }
              }
            `}</style>
            <Footer />
        </main>
    );
}
