import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Search() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section" style={{ textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ color: "var(--primary-green)", fontSize: "2.5rem", marginBottom: "2rem" }}>Ne aramıştınız?</h1>

                <div style={{ width: "100%", maxWidth: "600px", position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Vitamin, mineral veya sağlık hedefi arayın..."
                        style={{
                            width: "100%",
                            padding: "16px 80px 16px 20px",
                            borderRadius: "50px",
                            border: "2px solid var(--border)",
                            fontSize: "1rem",
                            outline: "none",
                            boxShadow: "var(--shadow-sm)",
                            boxSizing: "border-box"
                        }}
                    />
                    <button
                        className="btn"
                        style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "var(--corporate-blue)",
                            color: "white",
                            padding: "8px 20px",
                            borderRadius: "40px",
                            fontSize: "0.9rem"
                        }}
                    >
                        Ara
                    </button>
                </div>

                <div style={{ marginTop: "3rem" }}>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Popüler Aramalar:</p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        {["Enerji", "Uyku", "C Vitamini", "Magnezyum", "Saç & Cilt"].map(tag => (
                            <span key={tag} style={{ background: "var(--beige)", padding: "8px 16px", borderRadius: "20px", color: "var(--text-main)", fontSize: "0.9rem", cursor: "pointer" }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
