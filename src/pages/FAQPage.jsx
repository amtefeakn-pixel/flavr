import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="faq-item" style={{ borderBottom: '1px solid #eee', marginBottom: '10px' }}>
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '20px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: 'var(--color-text)'
                }}
            >
                {question}
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                    ▼
                </span>
            </button>
            <div
                style={{
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-out',
                    padding: isOpen ? '0 20px 20px' : '0 20px',
                    color: '#666',
                    lineHeight: '1.6'
                }}
            >
                {answer}
            </div>
        </div>
    );
};

const FAQPage = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Aromalarınızın kaynağı nedir ve doğal mıdır?",
            answer: "Tüm aromalarımız %100 doğal, bitkisel özlerden elde edilir ve yapay katkı maddesi, şeker veya tatlandırıcı içermez. Limonlarımız Akdeniz'in güneşli bahçelerinden, tarçınımız ise Uzak Doğu'nun yüksek dağlarından gelmektedir. Saflık ve doğallık garantisi veriyoruz."
        },
        {
            question: "Ürünleriniz vegan/vejetaryen sertifikasına sahip midir?",
            answer: "Evet, tüm ürünlerimiz hayvanlar üzerinde test edilmemiş olup, hiçbir hayvansal bileşen içermemektedir. Vegan ve vejetaryen kullanım için tamamen uygundur."
        },
        {
            question: "Aromaları en verimli şekilde nasıl kullanmalıyım?",
            answer: "En iyi sonuç için, 100 ml sıvıya (su, çay, kokteyl vb.) 3 ila 5 damla aroma eklemenizi öneririz. Yoğunluğu kendi damak zevkinize göre ayarlayabilirsiniz. Aşırıya kaçmamaya dikkat edin."
        },
        {
            question: "Açılan ürünleri ne kadar süre saklayabilirim ve nasıl muhafaza etmeliyim?",
            answer: "Açıldıktan sonra ürünlerimizi serin, kuru ve doğrudan güneş ışığı almayan bir yerde (oda sıcaklığında) 6 ay boyunca güvenle saklayabilirsiniz. Buzdolabında saklamaya gerek yoktur."
        },
        {
            question: "Siparişlerimi ne zaman teslim alabilirim ve kargo ücreti ne kadardır?",
            answer: "Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir ve teslimat süresi bölgenize göre değişir. 150 TL üzeri siparişlerde kargo ücretsizdir, bu tutarın altındaki siparişler için standart 19.90 TL kargo ücreti uygulanır."
        }
    ];

    const pageStyle = {
        paddingTop: '120px',
        paddingBottom: '80px',
        minHeight: '100vh',
    };

    return (
        <>
            <Header />
            <main style={pageStyle} className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--color-primary)' }}>Sıkça Sorulan Sorular</h1>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default FAQPage;
