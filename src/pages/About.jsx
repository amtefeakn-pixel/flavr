import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    const pageStyle = {
        paddingTop: '100px',
    };

    const sectionStyle = {
        padding: '80px 0',
    };

    const heroStyle = {
        textAlign: 'center',
        marginBottom: '60px',
    };

    const storyStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        marginBottom: '80px',
    };

    const imagePlaceholder = {
        flex: 1,
        height: '400px',
        backgroundColor: '#eee',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
    };

    const textStyle = {
        flex: 1,
    };

    // Detailed Process Component
    const ProcessSteps = () => {
        const steps = [
            { title: t('about.process_steps.source.title'), desc: t('about.process_steps.source.desc') },
            { title: t('about.process_steps.flavor.title'), desc: t('about.process_steps.flavor.desc') },
            { title: t('about.process_steps.bottling.title'), desc: t('about.process_steps.bottling.desc') },
            { title: t('about.process_steps.quality.title'), desc: t('about.process_steps.quality.desc') },
        ];

        return (
            <div style={{ margin: '80px 0', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '40px' }}>{t('about.process_title')}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Line */}
                    <div style={{ position: 'absolute', top: '20px', left: '0', width: '100%', height: '2px', backgroundColor: '#ddd', zIndex: -1 }}></div>

                    {steps.map((step, i) => (
                        <div key={i} style={{ backgroundColor: 'white', padding: '0 20px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontWeight: 'bold' }}>{i + 1}</div>
                            <h4 style={{ marginBottom: '10px' }}>{step.title}</h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Certifications Component
    const Certifications = () => {
        const certs = [
            t('about.certs.organic'),
            t('about.certs.nongmo'),
            t('about.certs.bcorp'),
            t('about.certs.recyclable')
        ];
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
                <h3 style={{ marginBottom: '30px' }}>{t('about.certifications_title')}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                    {certs.map((cert, i) => (
                        <div key={i} style={{ padding: '20px 40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontWeight: '600', color: '#555' }}>
                            {cert}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <main style={pageStyle} className="container">
                <section style={sectionStyle}>
                    <div style={heroStyle}>
                        <h1 style={{ fontSize: '48px', color: 'var(--color-primary)' }}>{t('about.title')}</h1>
                        <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>{t('about.subtitle')}</p>
                    </div>

                    <div style={storyStyle}>
                        <div style={textStyle}>
                            <h2 style={{ marginBottom: '20px' }}>{t('about.story_title')}</h2>
                            <p style={{ marginBottom: '20px', color: '#666' }}>
                                {t('about.story_p1')}
                            </p>
                            <p style={{ color: '#666' }}>
                                {t('about.story_p2')}
                            </p>
                        </div>
                        <div style={imagePlaceholder}>Lifestyle Photo</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '80px' }}>
                        <div style={{ padding: '40px', backgroundColor: '#f0fdfa', borderRadius: '20px' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>{t('about.vision_title')}</h3>
                            <p>{t('about.vision_text')}</p>
                        </div>
                        <div style={{ padding: '40px', backgroundColor: '#fffbeb', borderRadius: '20px' }}>
                            <h3 style={{ color: 'var(--color-accent-yellow)' }}>{t('about.mission_title')}</h3>
                            <p>{t('about.mission_text')}</p>
                        </div>
                    </div>

                    <ProcessSteps />
                    <Certifications />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
