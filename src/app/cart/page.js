"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function Cart() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Sepetim</h1>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }} className="cart-grid">
                    {/* Cart Items Placeholder */}
                    <div style={{ background: "white", padding: "2rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                        <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-muted)" }}>
                            <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>Sepetinizde henüz ürün bulunmamaktadır.</p>
                            <Link href="/shop" className="btn btn-primary">Alışverişe Başla</Link>
                        </div>
                    </div>

                    {/* Summary Placeholder */}
                    <div style={{ background: "var(--beige)", padding: "2rem", borderRadius: "var(--radius)", height: "fit-content" }}>
                        <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>Sipariş Özeti</h3>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <span style={{ color: "var(--text-muted)" }}>Ara Toplam</span>
                            <span style={{ fontWeight: "600" }}>0.00 TL</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <span style={{ color: "var(--text-muted)" }}>Kargo</span>
                            <span style={{ fontWeight: "600" }}>0.00 TL</span>
                        </div>

                        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                            <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>Toplam</span>
                            <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--primary-green)" }}>0.00 TL</span>
                        </div>

                        <button className="btn" style={{ width: "100%", backgroundColor: "var(--action-orange)", color: "white" }} disabled>Ödeme Yap</button>
                    </div>
                </div>
            </div>
            <style jsx>{`
              @media (max-width: 768px) {
                .cart-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
            <Footer />
        </main>
    );
}
