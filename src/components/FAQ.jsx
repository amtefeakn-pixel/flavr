import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const itemStyle = {
        borderBottom: '1px solid #eee',
        marginBottom: '10px',
    };

    const questionStyle = {
        padding: '20px 0',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: '600',
        color: '#333',
    };

    const answerStyle = {
        paddingBottom: '20px',
        color: '#666',
        display: isOpen ? 'block' : 'none',
        lineHeight: '1.6',
    };

    return (
        <div style={itemStyle}>
            <div style={questionStyle} onClick={() => setIsOpen(!isOpen)}>
                {question}
                <span style={{ color: 'var(--color-primary)' }}>{isOpen ? '−' : '+'}</span>
            </div>
            <div style={answerStyle}>{answer}</div>
        </div>
    );
};

const FAQ = () => {
    const sectionStyle = {
        padding: '60px 0',
    };

    const faqs = [
        { q: 'Is the water sparkling or still?', a: 'Our flavored waters are lightly carbonated for a refreshing fizz.' },
        { q: 'Are there any artificial sweeteners?', a: 'No! We use only natural fruit extracts. No sugar, no sweeteners.' },
        { q: 'What is the shelf life?', a: 'Best enjoyed within 12 months of bottling.' },
        { q: 'Is the packaging recyclable?', a: 'Yes, our bottles are made from 100% recycled plastic and are fully recyclable.' },
    ];

    return (
        <section style={sectionStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '30px', color: 'var(--color-primary)' }}>Frequently Asked Questions</h3>
            <div>
                {faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
            </div>
        </section>
    );
};

export default FAQ;
