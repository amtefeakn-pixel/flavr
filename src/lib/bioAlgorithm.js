import { questions } from "@/data/quizData";

export function calculateScores(userAnswers) {
    let scores = {};

    const addScore = (scoreObj) => {
        if (!scoreObj) return;
        Object.entries(scoreObj).forEach(([supplement, points]) => {
            scores[supplement] = (scores[supplement] || 0) + points;
        });
    };

    questions.forEach((question) => {
        const answer = userAnswers[question.id];

        // Skip if no answer provided for this question
        if (answer === undefined || answer === null || answer === "") return;

        if (question.type === "multi-select") {
            // answer is array of IDs
            if (Array.isArray(answer)) {
                answer.forEach((optId) => {
                    const option = question.options?.find((o) => o.id === optId);
                    if (option) addScore(option.score);
                });
            }
        } else if (question.type === "single-select") {
            // answer is single ID
            const option = question.options?.find((o) => o.id === answer);
            if (option) addScore(option.score);
        } else if (question.type === "slider" || question.type === "number") {
            const numericVal = parseInt(answer);
            if (!isNaN(numericVal)) {
                if (question.threshold && numericVal >= question.threshold && question.scoreAbove) {
                    addScore(question.scoreAbove);
                }
                if (question.threshold && numericVal <= question.threshold && question.scoreBelow) {
                    addScore(question.scoreBelow);
                }
            }
        } else if (question.type === "scale") {
            // Scale logic: specifically for 'priority' question
            if (question.id === "priority" && answer === 5 && question.scoreMap) {
                addScore(question.scoreMap[5]);
            }
        }
    });

    return scores;
}

export function getRecommendations(scores) {
    const recommendations = [];
    Object.entries(scores).forEach(([supp, score]) => {
        if (score >= 2 || score === 99) { // Threshold 2, or mandatory 99
            recommendations.push({ name: supp, score: score });
        }
    });
    return recommendations.sort((a, b) => b.score - a.score);
}
