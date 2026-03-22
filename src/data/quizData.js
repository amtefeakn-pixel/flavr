
// Helper to keep format consistent
const QUESTION_TYPES = {
    SINGLE: "single-select",
    MULTI: "multi-select",
    TEXT: "text",
    EMAIL: "email"
};

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

export const questions = [
    // --- BÖLÜM A: TIBBİ GEÇMİŞ VE İLAÇ KULLANIMI ---
    {
        id: "Q1",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Cinsiyetiniz nedir?",
        options: [
            { id: "female", label: "Kadın", intensity: 1.0, setFlags: [FLAGS.FEMALE] },
            { id: "male", label: "Erkek", intensity: 1.0, setFlags: [FLAGS.MALE] }
        ]
    },
    {
        id: "Q2",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Şu an hamilelik veya emzirme durumunuz var mı?",
        condition: { questionId: "Q1", value: "female" }, // Logic: Skip if male (handled in frontend usually, but good to have metadata)
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, setFlags: [FLAGS.PREG] }
        ]
    },
    {
        id: "Q3",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Özel olarak takip ettiğiniz bir diyet var mı?",
        options: [
            { id: "none", label: "Hayır / Standart", intensity: 0.0 },
            { id: "vegan", label: "Vegan / Vejetaryen", intensity: 1.0, impacts: { MITO: 50, NEURO: 40 }, setFlags: [FLAGS.VEGAN] },
            { id: "keto", label: "Ketojenik", intensity: 1.0, impacts: { LIVER: 30 }, setFlags: [FLAGS.KETO] },
            { id: "if", label: "Aralıklı Oruç (IF)", intensity: 0.5, impacts: { HPA: 20 } }
        ]
    },
    {
        id: "Q4",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Düzenli olarak kan sulandırıcı ilaç kullanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, setFlags: [FLAGS.BLOOD] }
        ]
    },
    {
        id: "Q5",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Antidepresan veya anksiyete ilacı kullanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { NEURO: 70, SLEEP: 30 }, setFlags: [FLAGS.SSRI] }
        ]
    },
    {
        id: "Q6",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Düzenli kullandığınız bir tiroid ilacı var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { MITO: 50, GLUCO: 40 }, setFlags: [FLAGS.THYROID] }
        ]
    },
    {
        id: "Q7",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Diyabet ilacı veya İnsülin kullanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GLUCO: 100 }, setFlags: [FLAGS.DIABETES] }
        ]
    },
    {
        id: "Q8",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Herhangi bir kalp veya tansiyon ilacı kullanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { HPA: 30, MITO: 40 }, setFlags: [FLAGS.HEART] }
        ]
    },
    {
        id: "Q9",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Doktor tarafından tanısı konulmuş bir otoimmün hastalığınız var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { IMM: 80, INF: 60 }, setFlags: [FLAGS.AUTOIMMUNE] }
        ]
    },
    {
        id: "Q10",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Safra keseniz alındı mı veya kesede taş/çamur problemi var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { LIVER: 100, GUT: 30 }, setFlags: [FLAGS.GALLBLADDER] }
        ]
    },
    {
        id: "Q11",
        phase: "Bölüm A: Tıbbi Geçmiş",
        type: QUESTION_TYPES.SINGLE,
        question: "Yakın zamanda planlanmış bir cerrahi operasyon geçirecek misiniz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, setFlags: [FLAGS.SURGERY] }
        ]
    },

    // --- BÖLÜM B: DEMOGRAFİK VE YAŞAM TARZI ---
    {
        id: "Q12",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Hangi yaş grubundasınız?",
        options: [
            { id: "18-30", label: "18-30", intensity: 0.2, impacts: { MITO: 20 } },
            { id: "31-45", label: "31-45", intensity: 0.5, impacts: { MITO: 50 } },
            { id: "46-60", label: "46-60", intensity: 0.8, impacts: { MITO: 70 } },
            { id: "60+", label: "60+", intensity: 1.0, impacts: { MITO: 80 }, setFlags: [FLAGS.AGE_60_PLUS] }
        ]
    },
    {
        id: "Q13",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Bel çevrenizde belirgin bir yağlanma (simit bölgesi) var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet/Belirgin", intensity: 1.0, impacts: { GLUCO: 100, LIVER: 50 } }
        ]
    },
    {
        id: "Q14",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Kilonuzu yönetmekte veya kilo vermekte zorlanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GLUCO: 90, MITO: 40 } }
        ]
    },
    {
        id: "Q15",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Sigara veya tütün ürünleri kullanıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "social", label: "Sosyal", intensity: 0.3, impacts: { LIVER: 30 } }, // Assumed logic based on previous (not explicitly detailed in block but "Sosyal (0.3)")
            { id: "regular", label: "Düzenli/Çok", intensity: 1.0, impacts: { LIVER: 100, MITO: 90, INF: 60 } }
        ]
    },
    {
        id: "Q16",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Alkol tüketim sıklığınız nedir?",
        options: [
            { id: "rare", label: "Nadir", intensity: 0.1, impacts: { LIVER: 10 } }, // Assumed low impact
            { id: "weekly", label: "Haftada 1-2", intensity: 0.5, impacts: { LIVER: 50 } }, // Assumed
            { id: "frequent", label: "Sık/Haftada 3+", intensity: 1.0, impacts: { LIVER: 90, NEURO: 50 } }
        ]
    },
    {
        id: "Q17",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Günlük hayattaki egzersiz rutininiz nasıldır?",
        options: [
            { id: "active", label: "Aktif", intensity: 0.0 },
            { id: "walk", label: "Yürüyüş", intensity: 0.4, impacts: { MITO: 40 } }, // Assumed impact based on previous
            { id: "inactive", label: "Hareketsiz", intensity: 1.0, impacts: { MITO: 90, GLUCO: 70 } }
        ]
    },
    {
        id: "Q18",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Günde kaç porsiyon taze meyve ve sebze tüketiyorsunuz?",
        options: [
            { id: "3plus", label: "3+ Porsiyon", intensity: 0.0 },
            { id: "1-2", label: "1-2 Porsiyon", intensity: 0.5, impacts: { INF: 40, IMM: 30 } },
            { id: "none", label: "Hiç / Çok Az", intensity: 1.0, impacts: { INF: 80, IMM: 60, GUT: 50 } }
        ]
    },
    {
        id: "Q19",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "En çok hangi besin grubunu ihmal ediyorsunuz?",
        options: [
            { id: "none", label: "Hiçbiri", intensity: 0.0 },
            { id: "protein", label: "Protein", intensity: 1.0, impacts: { NEURO: 50, INF: 40 } },
            { id: "veg", label: "Sebze/Yeşillik", intensity: 1.0, impacts: { LIVER: 60, GUT: 50 } },
            { id: "water", label: "Su", intensity: 1.0, impacts: { MITO: 60, NEURO: 50 } },
            { id: "fats", label: "Sağlıklı Yağlar", intensity: 1.0, impacts: { HPA: 50, NEURO: 40 } }

        ]
    },
    {
        id: "Q20",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "Son 1 yıl içerisinde antibiyotik kullandınız mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet/Birkaç kez", intensity: 1.0, impacts: { GUT: 100, IMM: 60 } }
        ]
    },
    {
        id: "Q21",
        phase: "Bölüm B: Yaşam Tarzı",
        type: QUESTION_TYPES.SINGLE,
        question: "İşiniz veya yaşam alanınız gereği endüstriyel kimyasallara ya da plastik maddelere maruz kalıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { LIVER: 60, MITO: 20 } }
        ]
    },

    // --- BÖLÜM C: SEMPTOM ANALİZİ ---
    {
        id: "Q22",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Sabahları uyanırken kendinizi dinlenmemiş veya 'tükenmiş' hissediyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { HPA: 90, MITO: 60 } }
        ]
    },
    {
        id: "Q23",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Gün içinde enerjinizin en çok düştüğü belirli bir zaman dilimi var mı?",
        options: [
            { id: "none", label: "Hayır", intensity: 0.0 },
            { id: "postmeal", label: "Yemek Sonrası", intensity: 1.0, impacts: { GLUCO: 90 } },
            { id: "afternoon", label: "Akşamüstü", intensity: 1.0, impacts: { HPA: 80 } }
        ]
    },
    {
        id: "Q24",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Spor yaptıktan sonra enerjiniz artar mı, yoksa kendinizi daha mı tükenmiş hissedersiniz?",
        options: [
            { id: "boost", label: "Artar", intensity: 0.0 },
            { id: "drain", label: "Tükenmiş Hissederim", intensity: 1.0, impacts: { MITO: 100 } }
        ]
    },
    {
        id: "Q25",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Sık sık üşüme veya el/ayaklarınızda soğukluk hisseder misiniz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { MITO: 80, HPA: 30 } }
        ]
    },
    {
        id: "Q26",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Yemekten hemen sonra (ilk 30 dakika içinde) şişkinlik yaşar mısınız?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GUT: 80 } }
        ]
    },
    {
        id: "Q27",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Akşamları karnınızda belirgin ('hamile gibi') bir şişlik oluşuyor mu?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GUT: 100 } }
        ]
    },
    {
        id: "Q28",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Tuvalet alışkanlıklarınızda bir düzensizlik (kabızlık/ishal vb.) var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GUT: 90 } }
        ]
    },
    {
        id: "Q29",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Ağız kokusu probleminiz veya dilinizin üzerinde beyaz bir pas tabakası var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GUT: 70, IMM: 40 } }
        ]
    },
    {
        id: "Q30",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Yemek yedikten sonra üzerinize ani bir uyku veya ağırlık çöküyor mu?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GLUCO: 100 } }
        ]
    },
    {
        id: "Q31",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Öğün saatiniz geciktiğinde sinirli olur musunuz veya ellerinizde titreme olur mu?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { GLUCO: 100, HPA: 70 } }
        ]
    },
    {
        id: "Q32",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Canınız bir şeyler atıştırmak istediğinde en çok ne çeker (Tuzlu mu, tatlı mı)?",
        options: [
            { id: "none", label: "Fark etmez/Çekmez", intensity: 0.0 },
            { id: "salty", label: "Tuzlu", intensity: 1.0, impacts: { HPA: 50 } },
            { id: "sweet", label: "Tatlı", intensity: 1.0, impacts: { GLUCO: 90 } }
        ]
    },
    {
        id: "Q33",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Odaklanma sorunu yaşıyor musunuz veya zihninizde 'beyin sisi' (bulanıklık) hissediyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { NEURO: 100 } }
        ]
    },
    {
        id: "Q34",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Kendinizi sürekli kaygılı veya huzursuz hissediyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { HPA: 90, NEURO: 80 } }
        ]
    },
    {
        id: "Q35",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Genel bir motivasyon düşüklüğü veya keyifsizlik hali yaşıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { NEURO: 100 } }
        ]
    },
    {
        id: "Q36",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Günlük hayattaki küçük streslere karşı tahammülünüzün azaldığını düşünüyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { HPA: 100 } }
        ]
    },
    {
        id: "Q37",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Sabahları uyandığınızda eklem sertliği veya eklem ağrısı yaşıyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { INF: 100 } }
        ]
    },
    {
        id: "Q38",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Cildinizde akne, egzama veya nedeni belirsiz döküntüler oluyor mu?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { INF: 90, LIVER: 40 } }
        ]
    },
    {
        id: "Q39",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Sık sık baş ağrısı veya migren atakları geçirir misiniz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { INF: 80, NEURO: 50 } }
        ]
    },
    {
        id: "Q40",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Gece yatağa girdiğinizde uykuya dalmanız 30 dakikadan uzun sürer mi?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { SLEEP: 90, HPA: 70 } }
        ]
    },
    {
        id: "Q41",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Gece uykunuz sık sık bölünür mü?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { SLEEP: 100 } }
        ]
    },
    {
        id: "Q42",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Gece özellikle 02:00 ile 04:00 saatleri arasında sebepsiz yere uyanır mısınız?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { SLEEP: 80, LIVER: 90 } }
        ]
    },
    {
        id: "Q43",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Saç dökülmesi veya tırnaklarınızda kolay kırılma sorunu var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { MITO: 20, GLUCO: 30 } }
        ]
    },
    {
        id: "Q44",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Sık sık kas krampları yaşar mısınız veya ışığa/sese karşı hassasiyetiniz var mı?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { HPA: 50, NEURO: 40 } }
        ]
    },
    {
        id: "Q45",
        phase: "Bölüm C: Semptomlar",
        type: QUESTION_TYPES.SINGLE,
        question: "Bağışıklığınızın düşük olduğunu veya sık hasta olduğunuzu düşünüyor musunuz?",
        options: [
            { id: "no", label: "Hayır", intensity: 0.0 },
            { id: "yes", label: "Evet", intensity: 1.0, impacts: { IMM: 100 } }
        ]
    },
    {
        id: "email",
        phase: "Sonuç",
        type: QUESTION_TYPES.EMAIL,
        question: "Sonuçlarınızı kaydetmek için e-posta adresiniz?",
        placeholder: "ornek@email.com"
    }
];
