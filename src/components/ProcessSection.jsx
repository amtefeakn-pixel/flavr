import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

const ProcessSection = () => {
    const { t } = useLanguage();

    const sectionStyle = {
        padding: '80px 0',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    };

    const gridStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '60px',
        flexWrap: 'wrap',
        marginTop: '40px',
    };

    const itemStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
    };

    const iconStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        fontSize: '32px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        color: 'var(--color-primary)',
    };

    const steps = [
        { icon: '💧', title: t('process.step1_title'), desc: t('process.step1_desc') },
        { icon: '🍃', title: t('process.step2_title'), desc: t('process.step2_desc') },
        { icon: '🛡️', title: t('process.step3_title'), desc: t('process.step3_desc') },
    ];

    return (
        <section style={sectionStyle}>
            <div className="container">
                <ScrollReveal>
                    <h2 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>{t('process.title')}</h2>
                    <p style={{ color: '#666' }}>{t('process.subtitle')}</p>
                </ScrollReveal>

                <div style={gridStyle}>
                    {steps.map((step, index) => (
                        <ScrollReveal key={index} delay={index * 0.2}>
                            <div style={itemStyle}>
                                <div style={iconStyle}>{step.icon}</div>
                                <h4 style={{ marginBottom: '10px' }}>{step.title}</h4>
                                <p style={{ fontSize: '14px', color: '#666' }}>{step.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
