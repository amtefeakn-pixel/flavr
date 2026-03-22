"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const blogPosts = [
    { id: 1, title: "Enerji Seviyenizi Doğal Yollarla Artırın", category: "Enerji", excerpt: "Gün boyu zinde kalmak için uygulayabileceğiniz 5 basit yöntem." },
    { id: 2, title: "Bağışıklık Sisteminizi Güçlendirin", category: "Bağışıklık", excerpt: "Mevsim geçişlerinde hastalıklardan korunmanın yolları." },
    { id: 3, title: "Kaliteli Uyku İçin İpuçları", category: "Uyku", excerpt: "Daha derin ve dinlendirici bir uyku için yapmanız gerekenler." },
    { id: 4, title: "Stres Yönetimi ve Vitaminler", category: "Stres", excerpt: "Stresli dönemlerde vücudunuzu destekleyecek takviyeler." },
    { id: 5, title: "Cilt Sağlığı İçin Beslenme", category: "Güzellik", excerpt: "Işıltılı bir cilt için tüketmeniz gereken besinler." },
];

export default function Blog() {
    return (
        <main className="flex-col min-h-screen">
            <Header />
            <div className="container section">
                <h1 style={{ color: "var(--text-main)", fontSize: "2.5rem", marginBottom: "3rem", fontWeight: "800" }}>Sağlıklı Yaşam Rehberleri</h1>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
                    {blogPosts.map((post) => (
                        <div key={post.id} style={{ background: "var(--beige)", padding: "2rem", borderRadius: "var(--radius)", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-md)", transition: "transform 0.2s", border: "1px solid var(--border)" }} className="blog-card">
                            <span style={{ color: "var(--text-main)", backgroundColor: "var(--primary-yellow)", padding: "4px 12px", borderRadius: "20px", width: "fit-content", fontWeight: "700", marginBottom: "1rem", fontSize: "0.8rem", boxShadow: "var(--shadow-sm)" }}>{post.category}</span>
                            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem", color: "var(--text-main)", fontWeight: "700" }}>{post.title}</h3>
                            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flex: 1, lineHeight: "1.6" }}>{post.excerpt}</p>
                            <Link href={`/blog/${post.id}`} style={{ color: "var(--text-main)", fontWeight: "700", borderBottom: "2px solid var(--corporate-blue)", width: "fit-content", paddingBottom: "2px", transition: "all 0.2s" }} className="read-more">Devamını Oku →</Link>
                        </div>
                    ))}
                </div>

                <style jsx>{`
          .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg) !important;
          }
          .read-more:hover {
            background-color: var(--primary-yellow);
            border-bottom-color: transparent !important;
            padding: 2px 5px;
            border-radius: 4px;
          }
        `}</style>
            </div>
            <Footer />
        </main>
    );
}
