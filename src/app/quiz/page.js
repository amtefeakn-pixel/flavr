import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
    return (
        <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background-white)" }}>
            <Header />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Quiz />
            </div>
        </main>
    );
}
