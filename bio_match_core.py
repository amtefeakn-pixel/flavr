import dataclasses
from typing import List, Dict, Optional, Tuple, Set

# --- SECTION 2: VARIABLE DICTIONARY & CONSTANTS ---

# Biological Categories (k)
CATEGORIES = [
    "HPA", "NEURO", "GLUCO", "MITO", "GUT", "LIVER", "IMM", "INF", "SLEEP"
]

# Safety Flags
FLAG_FEMALE = "FLAG_FEMALE"
FLAG_MALE = "FLAG_MALE"
FLAG_PREG = "FLAG_PREG"
FLAG_BLOOD = "FLAG_BLOOD"
FLAG_SSRI = "FLAG_SSRI"
FLAG_THYROID = "FLAG_THYROID"
FLAG_DIABETES = "FLAG_DIABETES"
FLAG_HEART = "FLAG_HEART"
FLAG_AUTOIMMUNE = "FLAG_AUTOIMMUNE"
FLAG_GALLBLADDER = "FLAG_GALLBLADDER"
FLAG_SURGERY = "FLAG_SURGERY"

# --- SECTION 4 & 5: DATA STRUCTURES ---

@dataclasses.dataclass
class Answer:
    text: str
    intensity: float  # a_i: 0.0 to 1.0
    impacts: Dict[str, float] = dataclasses.field(default_factory=dict) # Weight w_{i,k} (0-100)
    set_flags: List[str] = dataclasses.field(default_factory=list)

@dataclasses.dataclass
class Question:
    id: str
    text: str
    options: List[Answer]

@dataclasses.dataclass
class Product:
    name: str
    cluster: str
    efficacy_scores: Dict[str, float] # E_{p,k}: 0.0 - 1.0
    blacklist_flags: Set[str] = dataclasses.field(default_factory=set)

class User:
    def __init__(self):
        self.answers: Dict[str, float] = {} # question_id -> intensity
        self.flags: Set[str] = set()
        self.diagnostic_scores: Dict[str, float] = {k: 0.0 for k in CATEGORIES} # S_k

# --- SECTION 4: THE MASTER INPUT DATASET (QUESTIONS) ---

ALL_QUESTIONS = [
    # PART A: MEDICAL SAFETY FILTER
    Question("Q1", "Gender?", [
        Answer("Female", 1.0, set_flags=[FLAG_FEMALE]),
        Answer("Male", 1.0, set_flags=[FLAG_MALE])
    ]),
    Question("Q2", "Pregnant?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, set_flags=[FLAG_PREG])
    ]),
    Question("Q3", "Blood Thinners?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"LIVER": 20, "INF": 20}, set_flags=[FLAG_BLOOD])
    ]),
    Question("Q4", "Antidepressants?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 50, "NEURO": 70, "LIVER": 20, "SLEEP": 30}, set_flags=[FLAG_SSRI])
    ]),
    Question("Q5", "Thyroid Meds?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 20, "NEURO": 30, "GLUCO": 40, "MITO": 50}, set_flags=[FLAG_THYROID])
    ]),
    Question("Q6", "Diabetes Meds?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GLUCO": 100, "MITO": 30, "LIVER": 30}, set_flags=[FLAG_DIABETES])
    ]),
    Question("Q7", "Heart/BP Meds?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 30, "GLUCO": 20, "MITO": 40}, set_flags=[FLAG_HEART])
    ]),
    Question("Q8", "Autoimmune?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"IMM": 80, "INF": 60, "GUT": 40}, set_flags=[FLAG_AUTOIMMUNE])
    ]),
    Question("Q9", "Gallbladder Issues?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"LIVER": 100, "GUT": 30}, set_flags=[FLAG_GALLBLADDER])
    ]),
    Question("Q10", "Surgery Soon?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, set_flags=[FLAG_SURGERY])
    ]),

    # PART B: DEMOGRAPHICS & LIFESTYLE
    Question("Q11", "Age?", [
        Answer("18-30", 0.2, impacts={"MITO": 20}),
        Answer("31-45", 0.5, impacts={"MITO": 50, "GLUCO": 30}),
        Answer("46-60", 0.8, impacts={"MITO": 70, "INF": 50}),
        Answer("60+", 1.0, impacts={"MITO": 80, "INF": 60, "IMM": 50})
    ]),
    Question("Q12", "Belly Fat?", [
        Answer("None", 0.0),
        Answer("Mild", 0.5, impacts={"GLUCO": 50}),
        Answer("Significant", 1.0, impacts={"GLUCO": 100, "LIVER": 50, "INF": 40, "HPA": 30})
    ]),
    Question("Q13", "Weight Mgmt Hard?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GLUCO": 90, "MITO": 40, "LIVER": 30})
    ]),
    Question("Q14", "Smoking?", [
        Answer("No", 0.0),
        Answer("Social", 0.3, impacts={"LIVER": 30, "MITO": 20}),
        Answer("<1Pk", 0.7, impacts={"LIVER": 70, "MITO": 60, "INF": 40}),
        Answer(">1Pk", 1.0, impacts={"LIVER": 100, "MITO": 90, "INF": 60, "IMM": 70})
    ]),
    Question("Q15", "Alcohol?", [
        Answer("Rare", 0.1, impacts={"LIVER": 10}),
        Answer("Weekly", 0.5, impacts={"LIVER": 50, "GLUCO": 30}),
        Answer("3+/Week", 1.0, impacts={"LIVER": 90, "GLUCO": 50, "SLEEP": 60, "NEURO": 50})
    ]),
    Question("Q16", "Exercise?", [
        Answer("Regular", 0.0),
        Answer("Walking", 0.4, impacts={"MITO": 40}),
        Answer("Sedentary", 1.0, impacts={"MITO": 90, "GLUCO": 70, "INF": 40})
    ]),
    Question("Q17", "Antibiotics?", [
        Answer("No", 0.0),
        Answer("1x", 0.5, impacts={"GUT": 50, "IMM": 30}),
        Answer("2+", 1.0, impacts={"GUT": 100, "IMM": 60, "NEURO": 20})
    ]),
    Question("Q18", "Toxins?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"LIVER": 60, "MITO": 20, "IMM": 20})
    ]),

    # PART C: SYMPTOM ANALYSIS
    Question("Q19", "Morning Energy?", [
        Answer("Fresh", 0.0),
        Answer("Slow", 0.5, impacts={"HPA": 45, "MITO": 30}),
        Answer("Exhausted", 1.0, impacts={"HPA": 90, "MITO": 60, "SLEEP": 60})
    ]),
    Question("Q20", "Energy Crash?", [
        Answer("None", 0.0),
        Answer("Post-Meal", 1.0, impacts={"GLUCO": 90, "MITO": 50}),
        Answer("Afternoon", 1.0, impacts={"HPA": 80, "MITO": 50})
    ]),
    Question("Q21", "Post-Exercise?", [
        Answer("Good", 0.0),
        Answer("Crash", 1.0, impacts={"MITO": 100, "INF": 40, "HPA": 30})
    ]),
    Question("Q22", "Cold Hands?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"MITO": 80, "HPA": 30})
    ]),
    Question("Q23", "Bloating (Immediate)?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GUT": 80, "IMM": 30})
    ]),
    Question("Q24", "Bloating (PM)?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GUT": 100, "NEURO": 30, "INF": 30})
    ]),
    Question("Q25", "Stool Issues?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GUT": 90, "LIVER": 40})
    ]),
    Question("Q26", "Oral Thrush?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GUT": 70, "IMM": 40, "NEURO": 20})
    ]),
    Question("Q27", "Post-Meal Sleep?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GLUCO": 100, "MITO": 40, "NEURO": 30})
    ]),
    Question("Q28", "Hangry?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"GLUCO": 100, "HPA": 70, "NEURO": 50})
    ]),
    Question("Q29", "Cravings?", [
        Answer("Salty", 1.0, impacts={"HPA": 50}),
        Answer("Sweet", 1.0, impacts={"GLUCO": 90, "NEURO": 30})
    ]),
    Question("Q30", "Brain Fog?", [
        Answer("No", 0.0),
        Answer("Mild", 0.5, impacts={"NEURO": 50, "GUT": 25}),
        Answer("Severe", 1.0, impacts={"NEURO": 100, "GUT": 50, "MITO": 40})
    ]),
    Question("Q31", "Anxiety?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 90, "NEURO": 80, "SLEEP": 50})
    ]),
    Question("Q32", "Low Motivation?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"NEURO": 100, "HPA": 40, "SLEEP": 20})
    ]),
    Question("Q33", "Short Fuse?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 100, "NEURO": 60})
    ]),
    Question("Q34", "Joint Stiffness?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"INF": 100, "LIVER": 30, "GUT": 20})
    ]),
    Question("Q35", "Skin Issues?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"INF": 90, "LIVER": 40, "GUT": 50})
    ]),
    Question("Q36", "Migraines?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"INF": 80, "NEURO": 50, "LIVER": 50})
    ]),
    Question("Q37", "Sleep Onset?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"SLEEP": 90, "HPA": 70, "NEURO": 60})
    ]),
    Question("Q38", "Sleep Maintenance?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"SLEEP": 100, "HPA": 50, "NEURO": 30})
    ]),
    Question("Q39", "Waking 3AM?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"SLEEP": 80, "LIVER": 90, "GLUCO": 50})
    ]),
    Question("Q40", "Hair Loss?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"MITO": 20, "GLUCO": 30, "HPA": 20})
    ]),
    Question("Q41", "Cramps?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"HPA": 50, "NEURO": 40, "SLEEP": 30})
    ]),
    Question("Q42", "Frequent Flu?", [
        Answer("No", 0.0),
        Answer("Yes", 1.0, impacts={"IMM": 100, "MITO": 30, "GUT": 30})
    ]),
]

# --- SECTION 5: PRODUCT INVENTORY ---

ALL_PRODUCTS = [
    # 4.1. VITAMINS & MINERALS
    Product("B-Complex (Methylated)", "Foundation", {"MITO": 1.0, "NEURO": 0.9, "LIVER": 0.8, "HPA": 0.7, "GLUCO": 0.5, "IMM": 0.3, "INF": 0.2}),
    Product("Vitamin B12 (Methyl)", "Foundation", {"NEURO": 1.0, "MITO": 0.8, "LIVER": 0.5, "HPA": 0.4, "SLEEP": 0.2}),
    Product("Vitamin D3 + K2", "Foundation", {"IMM": 1.0, "INF": 0.5, "HPA": 0.4, "NEURO": 0.4, "GLUCO": 0.3, "MITO": 0.2, "SLEEP": 0.2}, {FLAG_BLOOD}),
    Product("Vitamin C (Liposomal)", "Foundation", {"IMM": 0.9, "HPA": 0.8, "LIVER": 0.6, "INF": 0.4, "MITO": 0.3, "NEURO": 0.2}),
    Product("Magnesium Bisglycinate", "Magnesium", {"SLEEP": 1.0, "HPA": 0.8, "NEURO": 0.6, "INF": 0.5, "MITO": 0.3, "GLUCO": 0.3, "GUT": 0.2}),
    Product("Magnesium Malate", "Magnesium", {"MITO": 0.9, "INF": 0.8, "HPA": 0.3, "NEURO": 0.2, "GLUCO": 0.2}),
    Product("Magnesium Threonate", "Magnesium", {"NEURO": 1.0, "SLEEP": 0.5, "HPA": 0.4, "INF": 0.3, "MITO": 0.2}),
    Product("Magnesium Citrate", "Magnesium", {"GUT": 0.9, "SLEEP": 0.2, "MITO": 0.2, "HPA": 0.2, "NEURO": 0.1, "GLUCO": 0.1}),
    Product("Zinc Picolinate", "Foundation", {"IMM": 1.0, "INF": 0.5, "GUT": 0.5, "HPA": 0.4, "MITO": 0.3, "NEURO": 0.3, "GLUCO": 0.3}),
    Product("Iron (Bisglycinate)", "Specific", {"MITO": 0.9, "NEURO": 0.5}),
    Product("Chromium Picolinate", "Insulin", {"GLUCO": 0.9, "HPA": 0.2}),

    # 4.2. BOTANICALS & ADAPTOGENS
    Product("Ashwagandha (KSM-66)", "Adaptogen", {"HPA": 1.0, "SLEEP": 0.7, "NEURO": 0.6, "MITO": 0.5, "IMM": 0.3, "INF": 0.3, "GLUCO": 0.3}, {FLAG_PREG, FLAG_THYROID}),
    Product("Rhodiola Rosea", "Adaptogen", {"HPA": 0.9, "NEURO": 0.8, "MITO": 0.7, "INF": 0.2, "IMM": 0.2, "GLUCO": 0.2}, {FLAG_PREG, FLAG_SSRI}),
    Product("Panax Ginseng", "Adaptogen", {"MITO": 0.9, "IMM": 0.5, "NEURO": 0.6, "GLUCO": 0.5, "HPA": 0.4, "INF": 0.2}, {FLAG_BLOOD}),
    Product("Berberine HCL", "Insulin", {"GLUCO": 1.0, "LIVER": 0.6, "GUT": 0.5, "INF": 0.4, "MITO": 0.4, "IMM": 0.2}, {FLAG_PREG, FLAG_DIABETES}),
    Product("Milk Thistle", "Detox", {"LIVER": 1.0, "INF": 0.2, "GUT": 0.1, "GLUCO": 0.2}),
    Product("Curcumin (Meriva)", "Inflammation", {"INF": 1.0, "NEURO": 0.5, "LIVER": 0.4, "IMM": 0.4, "GUT": 0.3, "HPA": 0.3, "GLUCO": 0.2}, {FLAG_BLOOD}),
    Product("Valerian Root", "Sleep", {"SLEEP": 0.9, "HPA": 0.2, "NEURO": 0.1}),
    Product("Ginkgo Biloba", "Brain", {"NEURO": 0.7, "INF": 0.2}, {FLAG_BLOOD}),

    # 4.3. AMINO ACIDS & OTHERS
    Product("L-Glutamine", "Gut", {"GUT": 1.0, "IMM": 0.4, "GLUCO": 0.4, "INF": 0.3, "HPA": 0.2}),
    Product("NAC", "Detox", {"LIVER": 1.0, "NEURO": 0.5, "IMM": 0.5, "INF": 0.4, "MITO": 0.3, "GUT": 0.2, "HPA": 0.1}),
    Product("CoQ10 (Ubiquinol)", "Energy", {"MITO": 1.0, "NEURO": 0.4, "IMM": 0.3, "INF": 0.3, "GLUCO": 0.2, "GUT": 0.2, "HPA": 0.1}),
    Product("Omega-3 (High EPA)", "Inflammation", {"INF": 0.9, "NEURO": 0.8, "IMM": 0.5, "HPA": 0.5, "LIVER": 0.3, "GLUCO": 0.3, "GUT": 0.2, "MITO": 0.2}, {FLAG_BLOOD}),
    Product("Probiotic (Spore)", "Gut", {"GUT": 1.0, "IMM": 0.7, "NEURO": 0.6, "INF": 0.4, "HPA": 0.3, "LIVER": 0.2, "MITO": 0.2, "GLUCO": 0.2}),
    Product("5-HTP", "Mood", {"NEURO": 0.9, "SLEEP": 0.8, "HPA": 0.4}, {FLAG_SSRI, FLAG_PREG}),
    Product("Collagen Peptides", "Structural", {"INF": 0.6, "GUT": 0.5}),
]

# --- SECTION 6: SAFETY PROTOCOL (BLACKLIST) ---
# Implemented as `blacklist_flags` in Product class directly.
# Additional specific logic applied in filtering if necessary (Product level)
# GLOBAL BANS based on flags (e.g. "Vitamin E" is not in list but "Gingko" is)
# We ensure the PRODUCT instances have the correct flags manually populated above.

# --- SECTION 1 & 3: LOGIC & MATH CORE ---

def calculate_max_possible_scores() -> Dict[str, float]:
    max_scores = {k: 0.0 for k in CATEGORIES}
    for q in ALL_QUESTIONS:
        # Find max possible weight for each category from this question
        # For simplicity, we assume max intensity is 1.0, so we check the max impact for each category across options
        # BUT the formula implies `sum(a_i * w_{i,k}) / MaxPossibleScore`.
        # MaxPossibleScore_k is the sum of max possible weights for category k across all questions.
        
        # Max weight for category K in Question Q:
        q_max_impacts = {k: 0.0 for k in CATEGORIES}
        for opt in q.options:
            for k, w in opt.impacts.items():
                if w > q_max_impacts[k]:
                    q_max_impacts[k] = w
        
        for k in CATEGORIES:
            max_scores[k] += q_max_impacts[k] * 1.0 # Max intensity is 1.0
            
    return max_scores

MAX_POSSIBLE_SCORES = calculate_max_possible_scores()

def calculate_diagnostic_score(user: User):
    """
    Phase 1: Diagnostic Engine
    Formula A: S_k = (Sum(a_i * w_{i,k}) / MaxPossibleScore_k) * 100
    """
    raw_scores = {k: 0.0 for k in CATEGORIES}

    # Iterate through user answers
    for q_id, answer_idx in user.answers.items():
        # Find the question and the selected answer
        question = next((q for q in ALL_QUESTIONS if q.id == q_id), None)
        if not question:
            continue
        
        # answer_idx is expected to be index of option selected strictly for simulation, 
        # but User structure might just hold the selected Answer object or derived impacts.
        # Let's refine User.answers to map QuestionID -> SelectedOptionIndex
        
        selected_option = question.options[int(answer_idx)]
        a_i = selected_option.intensity
        
        # Update User Flags
        for flag in selected_option.set_flags:
            user.flags.add(flag)
            
        # Accumulate weights
        for cat, weight in selected_option.impacts.items():
            if cat in CATEGORIES:
                raw_scores[cat] += a_i * weight
    
    # Normalize
    for cat in CATEGORIES:
        if MAX_POSSIBLE_SCORES[cat] > 0:
            user.diagnostic_scores[cat] = (raw_scores[cat] / MAX_POSSIBLE_SCORES[cat]) * 100
        else:
            user.diagnostic_scores[cat] = 0.0

def calculate_product_match_score(user: User, product: Product) -> float:
    """
    Phase 2: Matching Engine
    Formula B: Score = Sum(S_k * E_{p,k}) * C_safety
    """
    # Phase 3: Safety Firewall (C_safety)
    # Check if any user flag matches product blacklist
    for flag in user.flags:
        if flag in product.blacklist_flags:
            return 0.0 # C_safety = 0 (Blocked)
    
    # Specific Logic for "Detox" (Milk Thistle/NAC) if Pregnancy is blocked? 
    # The prompt says FLAG_PREG -> BANS Detox (Milk Thistle/NAC).
    # We added Milk Thistle/NAC products but didn't explicitly tag 'Detox' category ban in their definition above?
    # Actually, the prompt lists "Detox (Milk Thistle/NAC)" in the text description of FLAG_PREG.
    # Let's ensure those products have FLAG_PREG in their blacklist.
    # Wait, I initialized them above WITHOUT FLAG_PREG. I need to fix that based on SECTION 6 text.
    # Re-checking Section 6 vs Section 5.
    # Section 6 says "FLAG_PREG ... BANS ... Detox (Milk Thistle/NAC)".
    # The Product definitions in code above need to reflect this if not already.
    # I will add a post-init fix or handle specific overrides here.
    
    # Hardcoded overrides from Section 6 that might not be in product blacklist field:
    # "FLAG_PREG" -> Bans "Detox (Milk Thistle/NAC)"
    if FLAG_PREG in user.flags:
        if product.name in ["Milk Thistle", "NAC", "Ashwagandha (KSM-66)", "Panax Ginseng", "Rhodiola Rosea", "5-HTP", "Berberine HCL"]:
             return 0.0
             
    # "FLAG_BLOOD" -> Bans "Vitamin K2", "Ginkgo", "Omega-3", "Curcumin", "Ginseng", "Vitamin E"
    if FLAG_BLOOD in user.flags:
        if "Vitamin K2" in product.name or "Ginkgo" in product.name or "Omega-3" in product.name or "Curcumin" in product.name or "Ginseng" in product.name or "Vitamin E" in product.name:
            return 0.0
            
    # "FLAG_SSRI" -> Bans "5-HTP", "Rhodiola", "St. John's Wort"
    if FLAG_SSRI in user.flags:
        if product.name in ["5-HTP", "Rhodiola Rosea", "St. John's Wort"]:
             return 0.0

    # "FLAG_THYROID" -> Bans "Ashwagandha"
    if FLAG_THYROID in user.flags:
        if "Ashwagandha" in product.name:
            return 0.0

    # "FLAG_DIABETES" -> Bans "Berberine"
    if FLAG_DIABETES in user.flags:
        if "Berberine" in product.name:
            return 0.0
            
    # "FLAG_HEART" -> Bans "Licorice" (Licorice not in list, but strict check)
    if FLAG_HEART in user.flags and "Licorice" in product.name:
        return 0.0
        
    # "FLAG_AUTOIMMUNE" -> Bans "Echinacea", "Spirulina" (Not in list)
    if FLAG_AUTOIMMUNE in user.flags and product.name in ["Echinacea", "Spirulina"]:
        return 0.0

    # "FLAG_GALLBLADDER" -> Bans "Ox Bile", "High Fat" (Not in list)
    
    # Calculate Dot Product
    score = 0.0
    for k in CATEGORIES:
        s_k = user.diagnostic_scores[k] / 100.0 # Normalized S_k to 0-1 for calculation if needed? 
        # Formula says S_k is 0-100. E_p,k is 0.0-1.0.
        # "Match Score" usually implies higher is better. 
        # Let's keep S_k as 0-100.
        e_pk = product.efficacy_scores.get(k, 0.0)
        score += s_k * e_pk
        
    return score

def get_safe_bundle(user: User) -> List[Tuple[str, Product, float]]:
    """
    Phase 4: Commercial Bundling
    """
    # 1. Calculate scores for ALL products
    scored_products = []
    for p in ALL_PRODUCTS:
        score = calculate_product_match_score(user, p)
        if score > 0: # Only safe and relevant products
            scored_products.append((p, score))
    
    scored_products.sort(key=lambda x: x[1], reverse=True)
    
    # 2. Identify Top Categories
    sorted_categories = sorted(user.diagnostic_scores.items(), key=lambda x: x[1], reverse=True)
    top_cat_1 = sorted_categories[0][0]
    top_cat_2 = sorted_categories[1][0]
    
    bundle = []
    
    # Clustering Logic (Winner Takes All)
    # We need to filter the scored_products list to pick best from clusters FIRST?
    # Or do we pick slots and THEN apply cluster restrictions?
    # Logic: "Winner Takes All (Within Clusters)" implies we should pre-filter the list.
    
    # Define Clusters
    cluster_groups = {
        "Magnesium": ["Magnesium Bisglycinate", "Magnesium Malate", "Magnesium Threonate", "Magnesium Citrate"],
        "Insulin": ["Berberine HCL", "Chromium Picolinate"],
        "Adaptogen": ["Ashwagandha (KSM-66)", "Rhodiola Rosea", "Panax Ginseng"]
    }
    
    # Filter scored_products: For each cluster, keep ONLY the highest scoring one.
    final_pool = []
    
    # Track which clusters have been processed
    processed_clusters = set()
    
    # Create a map for quick access
    products_by_cluster = {}
    for p, s in scored_products:
        # Determine if p is in a special cluster
        p_cluster_group = None
        for group_name, item_names in cluster_groups.items():
            if p.name in item_names:
                p_cluster_group = group_name
                break
        
        if p_cluster_group:
            if p_cluster_group not in products_by_cluster:
                products_by_cluster[p_cluster_group] = []
            products_by_cluster[p_cluster_group].append((p, s))
        else:
            final_pool.append((p, s)) # Non-clustered products pass through
            
    # Add winners from clusters
    for group, items in products_by_cluster.items():
        # Items are already sorted because scored_products was sorted
        winner = items[0]
        final_pool.append(winner)
        
    # Re-sort final pool
    final_pool.sort(key=lambda x: x[1], reverse=True)
    
    # Slot 1: Hero (Addresses Top Cat 1)
    hero_product = None
    for p, s in final_pool:
        # Check if product effectively targets top_cat_1 (efficacy > 0.3 perhaps? or just highest score overall?)
        # Prompt says: "Product addressing the User's #1 Category". 
        # Usually implies the product with highest efficacy for that category or highest match score driven by that category.
        # Let's pick the highest Match Score product that has Efficacy > 0 for Top Cat 1.
        if p.efficacy_scores.get(top_cat_1, 0) > 0:
            hero_product = (p, s)
            break
            
    # Fallback if no product fits? (Unlikely given inventory)
    if not hero_product and final_pool:
        hero_product = final_pool[0]
        
    if hero_product:
        bundle.append(("Hero", hero_product[0], hero_product[1]))
        # Remove from pool
        final_pool = [x for x in final_pool if x[0].name != hero_product[0].name]
        
    # Slot 2: Helper (Addresses Top Cat 2)
    helper_product = None
    for p, s in final_pool:
        if p.efficacy_scores.get(top_cat_2, 0) > 0:
            helper_product = (p, s)
            break
            
    if not helper_product and final_pool:
        helper_product = final_pool[0]
        
    if helper_product:
        bundle.append(("Helper", helper_product[0], helper_product[1]))
        # Remove from pool
        final_pool = [x for x in final_pool if x[0].name != helper_product[0].name]
        
    # Slot 3: Foundation
    # Logic: If not present, add B-Complex or Multivitamin.
    # Exception: FLAG_PREG -> "Prenatal Multivitamin"
    
    foundation_product = None
    
    if FLAG_PREG in user.flags:
        # We don't have Prenatal in inventory, assuming we simulate or create it dynamically? 
        # Or just string match. The instructions say "Slot 3 MUST be 'Prenatal Multivitamin'".
        # I will return a dummy product object for this specific case if needed or check if it exists.
        # It's not in ALL_PRODUCTS. I will create a placeholder.
        foundation_product = (Product("Prenatal Multivitamin", "Foundation", {}), 100.0)
    else:
        # Check if we already have a foundation product in Slot 1 or 2?
        # Definition of Foundation in Inventory: B-Complex, B12, D3+K2, Vit C, Zinc.
        # "If not present [in bundle?], add..."
        
        has_foundation = False
        for role, p, s in bundle:
            if p.cluster == "Foundation":
                has_foundation = True
                break
        
        if not has_foundation:
            # Look for B-Complex specifically or highest scoring foundation?
            # Prompt: "add B-Complex or Multivitamin".
            # Try to find B-Complex in pool
            b_complex = next((x for x in final_pool if "B-Complex" in x[0].name), None)
            if b_complex:
                foundation_product = b_complex
            else:
                # Fallback to any high scoring Foundation product?
                found = next((x for x in final_pool if x[0].cluster == "Foundation"), None)
                if found:
                    foundation_product = found
        else:
            # If we already have a foundation, what goes in Slot 3? 
            # Prompt says "If not present, add...". Implies if already present, Slot 3 is... free? 
            # Or maybe Slot 3 IS the Foundation slot, and if Hero/Helper aren't foundation, we fill it.
            # If Hero/Helper IS foundation, do we need another? 
            # "Select the best 3-product combination (Hero + Helper + Foundation)."
            # This suggests the 3rd slot is reserved for Foundation.
            # If Hero is Foundation, do we pick another Foundation? Or just a general 3rd product?
            # Let's assume Slot 3 is STRICTLY for Foundation. If Hero/Helper took a foundation, we might just pick the next best one?
            # OR typically, "If not present" means "Ensure one of the 3 is Foundation".
            # Let's stick to: Slot 3 logic -> Try to pick B-Complex.
            pass

    # If we didn't force a foundation (chk logic), or if we need to fill the slot:
    if foundation_product:
        bundle.append(("Foundation", foundation_product[0], foundation_product[1]))
    elif len(bundle) < 3 and final_pool:
        # Fill with next best
        bundle.append(("Bonus", final_pool[0][0], final_pool[0][1]))

    return bundle

# --- EXECUTION: SIMULATION ---

def run_simulation():
    print("--- BIO-MATCH CORE V1.0 SIMULATION ---")
    
    # 5. SIMULATION CASE
    # User: Male, 40. Takes Blood Thinners. Complains of Joint Pain (Q34=Yes) and Brain Fog (Q30=Severe).
    
    user = User()
    
    # Map answers manually based on QIDs
    # Q1: Male -> Index 1 (Male)
    user.answers["Q1"] = 1
    # Q3: Blood Thinners -> Index 1 (Yes)
    user.answers["Q3"] = 1
    # Q11: Age? 40 -> Index 1 (31-45)
    user.answers["Q11"] = 1
    # Q30: Brain Fog -> Severe -> Index 2
    user.answers["Q30"] = 2
    # Q34: Joint Pain -> Yes -> Index 1
    user.answers["Q34"] = 1
    
    # "Normal" defaults (No/None) for others to handle "0" scores correctly? 
    # My calculate_diagnostic_score iterates user.answers. Unanswered questions contribute 0.
    # This is fine for simulation.
    
    print("\n[1] Calculating Diagnostic Scores...")
    calculate_diagnostic_score(user)
    
    print(f"User Flags: {user.flags}")
    print("Diagnostic Profile:")
    for k, v in user.diagnostic_scores.items():
        print(f"  {k}: {v:.2f}")
        
    print("\n[2] Generating Bundle...")
    bundle = get_safe_bundle(user)
    
    print("\n[3] FINAL RECOMMENDATION:")
    for role, product, score in bundle:
        print(f"  [{role}] {product.name} (Match Score: {score:.2f})")
        if product.blacklist_flags:
            print(f"      *Active Blacklist Flags: {product.blacklist_flags}")

    # Verify Logic check
    # Expectation: Omega-3 and Curcumin (High INF products) should be blocked by FLAG_BLOOD.
    # User has Joint Pain (INF) so normally they would score high.
    
    print("\n[4] SAFETY CHECK VERIFICATION:")
    # Check if specific blocked products have score 0
    blocked_products = ["Omega-3 (High EPA)", "Curcumin (Meriva)", "Ginkgo Biloba", "Panax Ginseng"]
    for p_name in blocked_products:
        p = next((x for x in ALL_PRODUCTS if x.name == p_name), None)
        if p:
            s = calculate_product_match_score(user, p)
            status = "BLOCKED" if s == 0 else f"ALLOWED (Score: {s})"
            print(f"  {p_name}: {status}")

if __name__ == "__main__":
    run_simulation()
