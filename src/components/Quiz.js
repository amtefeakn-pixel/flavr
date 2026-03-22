"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Quiz.module.css";
import { ArrowRight, Check, Info } from "lucide-react";
import { questions } from "@/data/quizData";


export default function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [scores, setScores] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[step];

    const submitQuiz = async () => {
        try {
            const res = await fetch("/api/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers })
            });
            const data = await res.json();
            if (data.success) {
                setScores(data.scores);
                // We can store recommendations in a new state or reuse scores to derive them.
                // For now, let's use the returned recommendations directly.
                setRecommendations(data.recommendations);
                setIsFinished(true);
            }
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitQuiz();
        }
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

    // State for recommendations from API
    const [recommendations, setRecommendations] = useState([]);

    if (isFinished) {
        return (
            <motion.div
                className={styles.results}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.scorecard}>
                    <h2>Teşekkürler!</h2>
                    <p className={styles.analyzingText}>Senin için hazırladığımız paket:</p>

                    <div className={styles.recommendationList}>
                        {recommendations.length > 0 ? (
                            recommendations.map((rec, index) => (
                                <div key={index} className={`${styles.recItem} ${styles[rec.role?.toLowerCase()] || ''}`}>
                                    <div className={styles.recHeader}>
                                        <span className={styles.recRole}>{rec.role === "Hero" ? "Ana Destek" : rec.role === "Helper" ? "Tamamlayıcı" : rec.role === "Foundation" ? "Temel" : "Bonus"}</span>
                                        <span className={styles.recScore}>%{Math.round(rec.score)} Eşleşme</span>
                                    </div>
                                    <span className={styles.recName}>{rec.name}</span>
                                    <span className={styles.recCluster}>{rec.cluster}</span>
                                </div>
                            ))
                        ) : (
                            <p>Genel Sağlık Paketi (Multivitamin)</p>
                        )}
                    </div>

                    <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Sepete Ekle</button>
                    <button className="btn btn-secondary" style={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={() => window.location.href = '/'}>Ana Sayfa</button>
                </div>
            </motion.div>
        );
    }

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
                                        onClick={() => {
                                            if (currentQuestion.type === "multi-select") {
                                                toggleOption(currentQuestion.id, opt.id);
                                            } else {
                                                handleAnswer(currentQuestion.id, opt.id);
                                            }
                                        }}
                                    >
                                        {/* Icons removed from data, handled here if needed, or text only for now as per prompt data */}
                                        {/* If icons are needed, we can map them based on opt.id or add a string icon field in data and map here. */}
                                        {opt.icon && <span className={styles.icon}>{IconMap[opt.icon]}</span>}
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

                    <button
                        className={`btn btn-primary ${styles.nextBtn}`}
                        onClick={handleNext}
                        disabled={
                            (currentQuestion.type === "multi-select" && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0)) ||
                            (currentQuestion.type !== "multi-select" && answers[currentQuestion.id] === undefined && currentQuestion.type !== "slider" && currentQuestion.type !== "scale") // Slider has default
                        }
                    >
                        Devam Et <ArrowRight size={20} />
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
