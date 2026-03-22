/**
 * BIO-MATCH CORE V1.0 - JavaScript Implementation
 * 
 * Logic Ported from Python Specification.
 * Last Updated: Force Fix for Syntax Error
 */

// --- CONSTANTS (MUST BE TOP LEVEL) ---

const CATEGORIES = [
    "HPA", "NEURO", "GLUCO", "MITO", "GUT", "LIVER", "IMM", "INF", "SLEEP"
];

const FLAGS = {
    FEMALE: "FLAG_FEMALE",
    MALE: "FLAG_MALE",
    PREG: "FLAG_PREG",
    BLOOD: "FLAG_BLOOD",
    SSRI: "FLAG_SSRI",
    THYROID: "FLAG_THYROID",
    DIABETES: "FLAG_DIABETES",
    HEART: "FLAG_HEART",
    AUTOIMMUNE: "FLAG_AUTOIMMUNE",
    GALLBLADDER: "FLAG_GALLBLADDER",
    SURGERY: "FLAG_SURGERY",
    VEGAN: "FLAG_VEGAN",
    KETO: "FLAG_KETO",
    AGE_60_PLUS: "FLAG_AGE_60_PLUS"
};

// --- PRODUCT INVENTORY ---

export const ALL_PRODUCTS = [
    // 4.1. VITAMINS & MINERALS
    { name: "B-Complex (Methylated)", cluster: "Foundation", efficacy: { MITO: 1.0, NEURO: 0.9, LIVER: 0.8, HPA: 0.7, GLUCO: 0.5, IMM: 0.3, INF: 0.2 }, blacklist: [] },
    { name: "Vitamin B12 (Methyl)", cluster: "Foundation", efficacy: { NEURO: 1.0, MITO: 0.8, LIVER: 0.5, HPA: 0.4, SLEEP: 0.2 }, blacklist: [] },
    { name: "Vitamin D3 + K2", cluster: "Foundation", efficacy: { IMM: 1.0, INF: 0.5, HPA: 0.4, NEURO: 0.4, GLUCO: 0.3, MITO: 0.2, SLEEP: 0.2 }, blacklist: [FLAGS.BLOOD] },
    { name: "Vitamin C (Liposomal)", cluster: "Foundation", efficacy: { IMM: 0.9, HPA: 0.8, LIVER: 0.6, INF: 0.4, MITO: 0.3, NEURO: 0.2 }, blacklist: [] },
    { name: "Magnesium Bisglycinate", cluster: "Magnesium", efficacy: { SLEEP: 1.0, HPA: 0.8, NEURO: 0.6, INF: 0.5, MITO: 0.3, GLUCO: 0.3, GUT: 0.2 }, blacklist: [] },
    { name: "Magnesium Malate", cluster: "Magnesium", efficacy: { MITO: 0.9, INF: 0.8, HPA: 0.3, NEURO: 0.2, GLUCO: 0.2 }, blacklist: [] },
    { name: "Magnesium Threonate", cluster: "Magnesium", efficacy: { NEURO: 1.0, SLEEP: 0.5, HPA: 0.4, INF: 0.3, MITO: 0.2 }, blacklist: [] },
    { name: "Magnesium Citrate", cluster: "Magnesium", efficacy: { GUT: 0.9, SLEEP: 0.2, MITO: 0.2, HPA: 0.2, NEURO: 0.1, GLUCO: 0.1 }, blacklist: [] },
    { name: "Zinc Picolinate", cluster: "Foundation", efficacy: { IMM: 1.0, INF: 0.5, GUT: 0.5, HPA: 0.4, MITO: 0.3, NEURO: 0.3, GLUCO: 0.3 }, blacklist: [] },
    { name: "Iron (Bisglycinate)", cluster: "Specific", efficacy: { MITO: 0.9, NEURO: 0.5 }, blacklist: [] },
    { name: "Chromium Picolinate", cluster: "Insulin", efficacy: { GLUCO: 0.9, HPA: 0.2 }, blacklist: [] },

    // 4.2. BOTANICALS & ADAPTOGENS
    { name: "Ashwagandha (KSM-66)", cluster: "Adaptogen", efficacy: { HPA: 1.0, SLEEP: 0.7, NEURO: 0.6, MITO: 0.5, IMM: 0.3, INF: 0.3, GLUCO: 0.3 }, blacklist: [FLAGS.PREG, FLAGS.THYROID] },
    { name: "Rhodiola Rosea", cluster: "Adaptogen", efficacy: { HPA: 0.9, NEURO: 0.8, MITO: 0.7, INF: 0.2, IMM: 0.2, GLUCO: 0.2 }, blacklist: [FLAGS.PREG, FLAGS.SSRI] },
    { name: "Panax Ginseng", cluster: "Adaptogen", efficacy: { MITO: 0.9, IMM: 0.5, NEURO: 0.6, GLUCO: 0.5, HPA: 0.4, INF: 0.2 }, blacklist: [FLAGS.BLOOD] },
    { name: "Berberine HCL", cluster: "Insulin", efficacy: { GLUCO: 1.0, LIVER: 0.6, GUT: 0.5, INF: 0.4, MITO: 0.4, IMM: 0.2 }, blacklist: [FLAGS.PREG, FLAGS.DIABETES] },
    { name: "Milk Thistle", cluster: "Detox", efficacy: { LIVER: 1.0, INF: 0.2, GUT: 0.1, GLUCO: 0.2 }, blacklist: [] },
    { name: "Curcumin (Meriva)", cluster: "Inflammation", efficacy: { INF: 1.0, NEURO: 0.5, LIVER: 0.4, IMM: 0.4, GUT: 0.3, HPA: 0.3, GLUCO: 0.2 }, blacklist: [FLAGS.BLOOD] },
    { name: "Valerian Root", cluster: "Sleep", efficacy: { SLEEP: 0.9, HPA: 0.2, NEURO: 0.1 }, blacklist: [] },
    { name: "Ginkgo Biloba", cluster: "Brain", efficacy: { NEURO: 0.7, INF: 0.2 }, blacklist: [FLAGS.BLOOD] },

    // 4.3. AMINO ACIDS & OTHERS
    { name: "L-Glutamine", cluster: "Gut", efficacy: { GUT: 1.0, IMM: 0.4, GLUCO: 0.4, INF: 0.3, HPA: 0.2 }, blacklist: [] },
    { name: "NAC", cluster: "Detox", efficacy: { LIVER: 1.0, NEURO: 0.5, IMM: 0.5, INF: 0.4, MITO: 0.3, GUT: 0.2, HPA: 0.1 }, blacklist: [] },
    { name: "CoQ10 (Ubiquinol)", cluster: "Energy", efficacy: { MITO: 1.0, NEURO: 0.4, IMM: 0.3, INF: 0.3, GLUCO: 0.2, GUT: 0.2, HPA: 0.1 }, blacklist: [] },
    { name: "Omega-3 (High EPA)", cluster: "Inflammation", efficacy: { INF: 0.9, NEURO: 0.8, IMM: 0.5, HPA: 0.5, LIVER: 0.3, GLUCO: 0.3, GUT: 0.2, MITO: 0.2 }, blacklist: [FLAGS.BLOOD] },
    { name: "Probiotic (Spore)", cluster: "Gut", efficacy: { GUT: 1.0, IMM: 0.7, NEURO: 0.6, INF: 0.4, HPA: 0.3, LIVER: 0.2, MITO: 0.2, GLUCO: 0.2 }, blacklist: [] },
    { name: "5-HTP", cluster: "Mood", efficacy: { NEURO: 0.9, SLEEP: 0.8, HPA: 0.4 }, blacklist: [FLAGS.SSRI, FLAGS.PREG] },
    { name: "Collagen Peptides", cluster: "Structural", efficacy: { INF: 0.6, GUT: 0.5 }, blacklist: [] },
];

// --- LOGIC FUNCTIONS ---

export class BioMatchEngine {
    constructor(questionsData) {
        this.questions = questionsData;
        this.maxScores = this.calculateMaxPossibleScores();
    }

    calculateMaxPossibleScores() {
        const maxScores = {};
        CATEGORIES.forEach(cat => maxScores[cat] = 0.0);

        this.questions.forEach(q => {
            if (!q.options) return;
            const qMaxImpacts = {};
            CATEGORIES.forEach(cat => qMaxImpacts[cat] = 0.0);

            q.options.forEach(opt => {
                if (opt.impacts) {
                    for (const [cat, val] of Object.entries(opt.impacts)) {
                        if (val > qMaxImpacts[cat]) {
                            qMaxImpacts[cat] = val;
                        }
                    }
                }
            });

            CATEGORIES.forEach(cat => {
                maxScores[cat] += qMaxImpacts[cat];
            });
        });

        return maxScores;
    }

    processQuiz(answers) {
        // 1. Calculate Diagnostic Scores & Flags
        const user = {
            scores: {},
            flags: new Set()
        };
        CATEGORIES.forEach(cat => user.scores[cat] = 0.0);

        const rawScores = {};
        CATEGORIES.forEach(cat => rawScores[cat] = 0.0);

        for (const [qId, response] of Object.entries(answers)) {
            const question = this.questions.find(q => q.id === qId);
            if (!question) continue;

            const responses = Array.isArray(response) ? response : [response];

            responses.forEach(optionId => {
                const selectedOption = question.options ? question.options.find(opt => opt.id === optionId) : null;

                if (selectedOption) {
                    const a_i = selectedOption.intensity !== undefined ? selectedOption.intensity : 1.0;

                    if (selectedOption.setFlags) {
                        selectedOption.setFlags.forEach(f => user.flags.add(f));
                    }

                    if (selectedOption.impacts) {
                        for (const [cat, val] of Object.entries(selectedOption.impacts)) {
                            if (CATEGORIES.includes(cat)) {
                                rawScores[cat] += val * a_i;
                            }
                        }
                    }
                }
            });
        }

        CATEGORIES.forEach(cat => {
            if (this.maxScores[cat] > 0) {
                user.scores[cat] = (rawScores[cat] / this.maxScores[cat]) * 100;
            } else {
                user.scores[cat] = 0.0;
            }
        });

        const recommendations = this.getSafeBundle(user);

        return {
            userProfile: user.scores,
            flags: Array.from(user.flags),
            recommendations
        };
    }

    calculateProductMatchScore(user, product) {
        for (const flag of Array.from(user.flags)) {
            if (product.blacklist.includes(flag)) return 0.0;
        }

        if (user.flags.has(FLAGS.PREG)) {
            const bans = ["Milk Thistle", "NAC", "Ashwagandha (KSM-66)", "Panax Ginseng", "Rhodiola Rosea", "5-HTP", "Berberine HCL"];
            if (bans.includes(product.name)) return 0.0;
        }
        if (user.flags.has(FLAGS.BLOOD) || user.flags.has(FLAGS.SURGERY)) {
            const bans = ["Vitamin K2", "Ginkgo Biloba", "Omega-3 (High EPA)", "Curcumin (Meriva)", "Panax Ginseng"];
            if (bans.includes(product.name) || product.name.includes("Ginkgo")) return 0.0;
        }
        if (user.flags.has(FLAGS.SSRI)) {
            const bans = ["5-HTP", "Rhodiola Rosea"];
            if (bans.includes(product.name)) return 0.0;
        }
        if (user.flags.has(FLAGS.THYROID) && product.name.includes("Ashwagandha")) return 0.0;
        if (user.flags.has(FLAGS.DIABETES) && product.name.includes("Berberine")) return 0.0;
        if (user.flags.has(FLAGS.HEART) && product.name.includes("Licorice")) return 0.0;
        if (user.flags.has(FLAGS.AUTOIMMUNE) && ["Echinacea", "Spirulina"].includes(product.name)) return 0.0;

        let score = 0.0;
        for (const cat of CATEGORIES) {
            const s_k = user.scores[cat];
            const e_pk = product.efficacy[cat] || 0.0;
            score += s_k * e_pk;
        }
        return score;
    }

    getSafeBundle(user) {
        const scoredProducts = ALL_PRODUCTS.map(p => ({
            product: p,
            score: this.calculateProductMatchScore(user, p)
        })).filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score);

        const sortedCats = Object.entries(user.scores).sort((a, b) => b[1] - a[1]);
        const topCat1 = sortedCats[0][0];
        const topCat2 = sortedCats[1][0];

        const clusterGroups = {
            "Magnesium": ["Magnesium Bisglycinate", "Magnesium Malate", "Magnesium Threonate", "Magnesium Citrate"],
            "Insulin": ["Berberine HCL", "Chromium Picolinate"],
            "Adaptogen": ["Ashwagandha (KSM-66)", "Rhodiola Rosea", "Panax Ginseng"]
        };

        const finalPool = [];
        const clusterMap = {};

        scoredProducts.forEach(item => {
            let pCluster = null;
            for (const [groupName, pNames] of Object.entries(clusterGroups)) {
                if (pNames.includes(item.product.name)) {
                    pCluster = groupName;
                    break;
                }
            }

            if (pCluster) {
                if (!clusterMap[pCluster]) clusterMap[pCluster] = [];
                clusterMap[pCluster].push(item);
            } else {
                finalPool.push(item);
            }
        });

        for (const list of Object.values(clusterMap)) {
            if (list.length > 0) finalPool.push(list[0]);
        }

        finalPool.sort((a, b) => b.score - a.score);

        const bundle = [];

        // Vegan Override: Force B12 if Vegan
        if (user.flags.has(FLAGS.VEGAN)) {
            let b12 = finalPool.find(x => x.product.name.includes("Vitamin B12")) ||
                scoredProducts.find(x => x.product.name.includes("Vitamin B12"));

            if (b12) {
                bundle.push({ ...b12.product, role: "Foundation", score: 100 });
                const idx = finalPool.findIndex(x => x.product.name === b12.product.name);
                if (idx > -1) finalPool.splice(idx, 1);
            }
        }

        // Slot 1: Hero
        if (bundle.length < 3) {
            let hero = finalPool.find(x => (x.product.efficacy[topCat1] || 0) > 0);
            if (!hero && finalPool.length > 0) hero = finalPool[0];

            if (hero) {
                bundle.push({ ...hero.product, role: "Hero", score: hero.score });
                const idx = finalPool.indexOf(hero);
                if (idx > -1) finalPool.splice(idx, 1);
            }
        }

        // Slot 2: Helper
        if (bundle.length < 3) {
            let helper = finalPool.find(x => (x.product.efficacy[topCat2] || 0) > 0);
            if (!helper && finalPool.length > 0) helper = finalPool[0];

            if (helper) {
                bundle.push({ ...helper.product, role: "Helper", score: helper.score });
                const idx = finalPool.indexOf(helper);
                if (idx > -1) finalPool.splice(idx, 1);
            }
        }

        // Slot 3: Foundation
        if (bundle.length < 3) {
            let foundation = null;

            if (user.flags.has(FLAGS.PREG)) {
                foundation = { name: "Prenatal Multivitamin", cluster: "Foundation", role: "Foundation", score: 100 };
            } else {
                const hasFound = bundle.some(p => p.cluster === "Foundation");
                if (!hasFound) {
                    foundation = finalPool.find(x => x.product.name.includes("B-Complex"))?.product ||
                        finalPool.find(x => x.product.cluster === "Foundation")?.product;

                    if (foundation) {
                        const fScore = scoredProducts.find(x => x.product.name === foundation.name)?.score || 0;
                        foundation = { ...foundation, role: "Foundation", score: fScore };
                    }
                }
            }

            if (foundation) {
                bundle.push(foundation);
            } else if (bundle.length < 3 && finalPool.length > 0) {
                const bonus = finalPool[0];
                bundle.push({ ...bonus.product, role: "Bonus", score: bonus.score });
            }
        }

        return bundle;
    }
}
