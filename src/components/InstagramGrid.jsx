import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

const InstagramGrid = () => {
    const { t } = useLanguage();

    const sectionStyle = {
        padding: '80px 0',
        backgroundColor: '#fff',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '10px',
        marginTop: '40px',
    };

    const itemStyle = {
        aspectRatio: '1/1',
        backgroundColor: '#eee',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(64, 224, 208, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    };

    // Placeholder for 6 images
    const images = [1, 2, 3, 4, 5, 6];

    return (
        <section style={sectionStyle} className="container">
            <div style={{ textAlign: 'center' }}>
                <ScrollReveal>
                    <h2 style={{ color: 'var(--color-primary)' }}>{t('social.follow_title')}</h2>
                    <p style={{ color: '#666' }}>{t('social.follow_subtitle')}</p>
                </ScrollReveal>
            </div>

            <div className="insta-grid">
                {images.map((img, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                        <div className="insta-item">
                            {/* Placeholder Image with random tint for variety */}
                            <img
                                src={`https://picsum.photos/400/400?random=${index}`}
                                alt={`Instagram post ${index + 1}`}
                            />

                            {/* Hover Overlay */}
                            <div className="insta-overlay">
                                <span>❤️ {100 + index * 15}</span>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default InstagramGrid;
