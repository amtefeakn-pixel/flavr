"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./Quiz.module.css";
import {
    ArrowRight, Check, Info, Sparkles, ShoppingCart,
    Shield, Zap, Moon, Brain, Leaf, Heart, Star,
    RotateCcw, ChevronRight, Package, ArrowLeft
} from "lucide-react";
import { questions } from "@/data/quizData";

const STORAGE_KEY = "flavr_quiz_progress";

// Mock result data for when API isn't available
const MOCK_RESULTS = {
    scores: {
        energy: 82, stress: 65, sleep: 71, immunity: 88, cognitive: 74, digestion: 56,
    },
    recommendations: [
        { name: "D3 + K2 Vitamini", role: "Hero", cluster: "Temel", score: 95, price: 249, emoji: "☀️", desc: "Kemik sağlığı ve bağışıklık sistemi için kritik destek." },
        { name: "Omega-3 Balık Yağı", role: "Hero", cluster: "Temel", score: 91, price: 299, emoji: "🐟", desc: "Beyin fonksiyonları ve kalp sağlığı için EPA/DHA desteği." },
        { name: "Magnezyum Glisinaat", role: "Helper", cluster: "Magnezyum", score: 87, price: 219, emoji: "💎", desc: "Kas gevşemesi, uyku kalitesi ve stres yönetimi." },
        { name: "B-Complex (Methylated)", role: "Helper", cluster: "Temel", score: 84, price: 279, emoji: "⚡", desc: "Enerji metabolizması ve sinir sistemi desteği." },
        { name: "Ashwagandha KSM-66", role: "Foundation", cluster: "Adaptogen", score: 78, price: 349, emoji: "🌿", desc: "Stres adaptasyonu ve kortizol dengeleme." },
    ],
};

const ROLE_CONFIG = {
    Hero: { label: "Ana Destek", color: "#fea6a6", icon: Star },
    Helper: { label: "Tamamlayıcı", color: "#A8D5BA", icon: Shield },
    Foundation: { label: "Temel", color: "#7ec8e3", icon: Leaf },
    Bonus: { label: "Bonus", color: "#f5c842", icon: Sparkles },
};

const SCORE_CONFIG = [
    { key: "energy", label: "Enerji", icon: Zap, color: "#fea6a6" },
    { key: "immunity", label: "Bağışıklık", icon: Shield, color: "#A8D5BA" },
    { key: "cognitive", label: "Bilişsel", icon: Brain, color: "#7ec8e3" },
    { key: "sleep", label: "Uyku", icon: Moon, color: "#9b8fd4" },
    { key: "stress", label: "Stres", icon: Heart, color: "#f07878" },
    { key: "digestion", label: "Sindirim", icon: Leaf, color: "#2F855A" },
];

export default function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [scores, setScores] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResume, setShowResume] = useState(false);

    // Load saved progress on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const { step: savedStep, answers: savedAnswers } = JSON.parse(saved);
                if (savedStep > 0 && Object.keys(savedAnswers).length > 0) {
                    setShowResume(true);
                }
            }
        } catch { }
    }, []);

    // Save progress on every answer
    useEffect(() => {
        if (step > 0 || Object.keys(answers).length > 0) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
            } catch { }
        }
    }, [step, answers]);

    const resumeQuiz = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const { step: savedStep, answers: savedAnswers } = JSON.parse(saved);
                setStep(savedStep);
                setAnswers(savedAnswers);
            }
        } catch { }
        setShowResume(false);
    };

    const startFresh = () => {
        localStorage.removeItem(STORAGE_KEY);
        setStep(0);
        setAnswers({});
        setShowResume(false);
    };

    const clearSavedProgress = () => {
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    };

    const currentQuestion = questions[step];

    const submitQuiz = async () => {
        setIsAnalyzing(true);

        try {
            const res = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers })
            });
            const data = await res.json();
            if (data.success) {
                setScores(data.scores || MOCK_RESULTS.scores);
                setRecommendations(data.recommendations || MOCK_RESULTS.recommendations);
            } else {
                setScores(MOCK_RESULTS.scores);
                setRecommendations(MOCK_RESULTS.recommendations);
            }
        } catch {
            // Fallback to mock data if API fails
            setScores(MOCK_RESULTS.scores);
            setRecommendations(MOCK_RESULTS.recommendations);
        }

        clearSavedProgress();

        // Fake analysis delay for UX
        await new Promise(r => setTimeout(r, 2500));
        setIsAnalyzing(false);
        setIsFinished(true);
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitQuiz();
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value });
    };

    const toggleOption = (key, optionId) => {
        const current = answers[key] || [];
        if (current.includes(optionId)) {
            handleAnswer(key, current.filter(id => id !== optionId));
        } else {
            handleAnswer(key, [...current, optionId]);
        }
    };

    // ─── Resume Dialog ────────────────────────────────────
    if (showResume) {
        return (
            <div className={styles.quizContainer}>
                <motion.div
                    className={styles.questionCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={styles.resumeIcon}>
                        <RotateCcw size={32} />
                    </div>
                    <h2 className={styles.question}>Kaldığın Yerden Devam Et</h2>
                    <p className={styles.resumeText}>
                        Daha önce başladığın bir test var. Kaldığın yerden devam etmek ister misin?
                    </p>
                    <div className={styles.resumeButtons}>
                        <button className={`btn btn-primary ${styles.nextBtn}`} onClick={resumeQuiz}>
                            Devam Et <ArrowRight size={20} />
                        </button>
                        <button className={`btn btn-outline ${styles.restartBtn}`} onClick={startFresh}>
                            Baştan Başla
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ─── Analyzing Animation ──────────────────────────────
    if (isAnalyzing) {
        return (
            <div className={styles.quizContainer}>
                <motion.div
                    className={styles.analyzingCard}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className={styles.analyzingSpinner} />
                    <h2 className={styles.analyzingTitle}>Analiz Ediliyor</h2>
                    <p className={styles.analyzingText}>
                        Yanıtlarınız bilimsel algoritmamız tarafından değerlendiriliyor...
                    </p>
                    <div className={styles.analyzingSteps}>
                        <motion.div
                            className={styles.analyzingStep}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Check size={16} /> Sağlık profili oluşturuluyor
                        </motion.div>
                        <motion.div
                            className={styles.analyzingStep}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <Check size={16} /> 26 vitamin eşleştiriliyor
                        </motion.div>
                        <motion.div
                            className={styles.analyzingStep}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.7 }}
                        >
                            <Check size={16} /> Kişisel paketiniz hazırlanıyor
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ─── Results Screen ───────────────────────────────────
    if (isFinished) {
        const totalPrice = recommendations.reduce((s, r) => s + (r.price || 0), 0);
        const userName = answers.name || answers.isim || "Kullanıcı";

        return (
            <motion.div
                className={styles.resultsPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Hero Section */}
                <div className={styles.resultsHero}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className={styles.resultsBadge}
                    >
                        <Sparkles size={24} />
                    </motion.div>
                    <h1 className={styles.resultsTitle}>
                        Paketiniz Hazır, <span className={styles.resultsName}>{userName}</span>!
                    </h1>
                    <p className={styles.resultsSubtitle}>
                        Yanıtlarınıza göre kişiselleştirilmiş vitamin paketinizi oluşturduk.
                    </p>
                </div>

                {/* Health Scores */}
                <div className={styles.scoresSection}>
                    <h3 className={styles.sectionLabel}>Sağlık Profiliniz</h3>
                    <div className={styles.scoresGrid}>
                        {SCORE_CONFIG.map(({ key, label, icon: Icon, color }) => {
                            const val = scores[key] || 0;
                            return (
                                <motion.div
                                    key={key}
                                    className={styles.scoreItem}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className={styles.scoreIconWrap} style={{ background: color + "20", color }}>
                                        <Icon size={18} />
                                    </div>
                                    <div className={styles.scoreInfo}>
                                        <div className={styles.scoreLabel}>{label}</div>
                                        <div className={styles.scoreBarOuter}>
                                            <motion.div
                                                className={styles.scoreBarInner}
                                                style={{ background: color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${val}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                    <span className={styles.scoreValue} style={{ color }}>%{val}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommendations */}
                <div className={styles.recsSection}>
                    <h3 className={styles.sectionLabel}>Senin İçin Seçtiğimiz Vitaminler</h3>
                    <div className={styles.recsList}>
                        {recommendations.map((rec, i) => {
                            const roleConf = ROLE_CONFIG[rec.role] || ROLE_CONFIG.Foundation;
                            const RoleIcon = roleConf.icon;
                            return (
                                <motion.div
                                    key={i}
                                    className={styles.recCard}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <div className={styles.recEmoji}>{rec.emoji || "💊"}</div>
                                    <div className={styles.recBody}>
                                        <div className={styles.recTop}>
                                            <span className={styles.recCardName}>{rec.name}</span>
                                            <span className={styles.recRoleBadge} style={{ background: roleConf.color + "20", color: roleConf.color }}>
                                                <RoleIcon size={12} /> {roleConf.label}
                                            </span>
                                        </div>
                                        <p className={styles.recDesc}>{rec.desc || rec.cluster}</p>
                                        <div className={styles.recBottom}>
                                            <span className={styles.recMatch}>
                                                %{Math.round(rec.score)} eşleşme
                                            </span>
                                            {rec.price && (
                                                <span className={styles.recPrice}>₺{rec.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.resultsCta}>
                    <div className={styles.ctaCard}>
                        <div className={styles.ctaInfo}>
                            <Package size={20} />
                            <div>
                                <span className={styles.ctaLabel}>Kişisel Paketiniz</span>
                                <span className={styles.ctaCount}>{recommendations.length} ürün</span>
                            </div>
                        </div>
                        <div className={styles.ctaPriceBlock}>
                            {totalPrice > 0 && (
                                <>
                                    <span className={styles.ctaOldPrice}>₺{totalPrice}</span>
                                    <span className={styles.ctaNewPrice}>₺{Math.round(totalPrice * 0.85)}</span>
                                </>
                            )}
                        </div>
                        <button className={`btn btn-primary ${styles.ctaBtn}`}>
                            <ShoppingCart size={18} /> Paketi Sepete Ekle
                        </button>
                        <p className={styles.ctaNote}>İlk siparişe %15 indirim · Ücretsiz kargo</p>
                    </div>
                    <div className={styles.ctaLinks}>
                        <Link href="/catalog" className={styles.ctaLink}>
                            Kataloğu İncele <ChevronRight size={14} />
                        </Link>
                        <Link href="/" className={styles.ctaLink}>
                            Ana Sayfa <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        );
    }

    // ─── Quiz Questions ───────────────────────────────────
    return (
        <div className={styles.quizContainer}>
            {/* Phase Indicator */}
            <div className={styles.phaseIndicator}>
                {currentQuestion.phase}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={styles.questionCard}
                >
                    <h2 className={styles.question}>{currentQuestion.question}</h2>

                    {/* Why We Ask Box */}
                    <div className={styles.whyAskBox}>
                        <Info size={18} className={styles.infoIcon} />
                        <div>
                            <strong>Bu Soruyu Neden Soruyoruz?</strong>
                            <p>{currentQuestion.whyAsk}</p>
                        </div>
                    </div>

                    <div className={styles.inputArea}>
                        {currentQuestion.type === "text" || currentQuestion.type === "email" ? (
                            <input
                                type={currentQuestion.type}
                                className={styles.input}
                                placeholder={currentQuestion.placeholder}
                                value={answers[currentQuestion.id] || ""}
                                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                autoFocus
                            />
                        ) : currentQuestion.type === "number" ? (
                            <input
                                type="number"
                                className={styles.input}
                                value={answers[currentQuestion.id] || ""}
                                onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
                            />
                        ) : currentQuestion.type === "slider" || currentQuestion.type === "scale" ? (
                            <div className={styles.sliderContainer}>
                                <input
                                    type="range"
                                    min={currentQuestion.min || 1}
                                    max={currentQuestion.max || 5}
                                    value={answers[currentQuestion.id] || (currentQuestion.min || 1)}
                                    onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value))}
                                    className={styles.slider}
                                />
                                <div className={styles.sliderLabels}>
                                    <span>{currentQuestion.minLabel || currentQuestion.min || 1}</span>
                                    <span className={styles.currentValue}>{answers[currentQuestion.id] || (currentQuestion.min || 1)}</span>
                                    <span>{currentQuestion.maxLabel || currentQuestion.max || 5}</span>
                                </div>
                            </div>
                        ) : currentQuestion.type === "multi-select" ? (
                            <div className={styles.optionsGrid}>
                                {currentQuestion.options.map(opt => (
                                    <motion.button
                                        key={opt.id}
                                        whileHover={{ scale: 1.02, borderColor: "var(--primary-yellow)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`${styles.optionBtn} ${answers[currentQuestion.id] === opt.id || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].includes(opt.id)) ? styles.selected : ""}`}
                                        onClick={() => toggleOption(currentQuestion.id, opt.id)}
                                    >
                                        {opt.label}
                                        {(answers[currentQuestion.id] === opt.id || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].includes(opt.id))) && <Check size={20} className={styles.check} />}
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.optionsList}>
                                {currentQuestion.options.map(opt => (
                                    <motion.button
                                        key={opt.id}
                                        whileHover={{ x: 5, borderColor: "var(--primary-yellow)" }}
                                        className={`${styles.optionListBtn} ${answers[currentQuestion.id] === opt.id ? styles.selected : ""}`}
                                        onClick={() => handleAnswer(currentQuestion.id, opt.id)}
                                    >
                                        {opt.label}
                                        {answers[currentQuestion.id] === opt.id && <Check size={20} />}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.navButtons}>
                        {step > 0 && (
                            <button className={`btn btn-outline ${styles.prevBtn}`} onClick={handlePrev}>
                                <ArrowLeft size={18} /> Geri
                            </button>
                        )}
                        <button
                            className={`btn btn-primary ${styles.nextBtn}`}
                            onClick={handleNext}
                            disabled={
                                (currentQuestion.type === "multi-select" && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)) ||
                                (currentQuestion.type !== "multi-select" && answers[currentQuestion.id] === undefined && currentQuestion.type !== "slider" && currentQuestion.type !== "scale")
                            }
                        >
                            {step === questions.length - 1 ? "Sonuçları Gör" : "Devam Et"} <ArrowRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
