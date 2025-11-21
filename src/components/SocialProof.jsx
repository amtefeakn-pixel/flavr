import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

const SocialProof = () => {
    const { t } = useLanguage();

    const sectionStyle = {
        padding: '80px 0',
        backgroundColor: 'white',
    };

    const scrollContainerStyle = {
        display: 'flex',
        gap: '30px',
        overflowX: 'auto',
        padding: '20px 0',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
    };

    const cardStyle = {
        minWidth: '300px',
        backgroundColor: '#f5f5f5',
        padding: '30px',
        borderRadius: '15px',
        flexShrink: 0,
    };

    const reviews = [
        { name: 'Sarah J.', text: 'Absolutely love the Lemon Zest! So refreshing after a workout.', rating: '⭐⭐⭐⭐⭐' },
        { name: 'Mike T.', text: 'Finally a flavored water that doesn\'t taste artificial. 10/10.', rating: '⭐⭐⭐⭐⭐' },
        { name: 'Emily R.', text: 'The packaging is beautiful and the taste is even better.', rating: '⭐⭐⭐⭐⭐' },
        { name: 'David L.', text: 'My go-to drink for summer. Strawberry Splash is the best.', rating: '⭐⭐⭐⭐' },
    ];

    return (
        <section style={sectionStyle}>
            <div className="container">
                <ScrollReveal>
                    <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--color-primary)' }}>{t('social.reviews_title')}</h2>
                </ScrollReveal>

                <div className="social-scroll-wrapper">
                    <div className="social-scroll">
                        {reviews.map((review, index) => (
                            <ScrollReveal key={index} delay={index * 0.2} className="social-card-wrapper">
                                <div className="testimonial-card">
                                    <div style={{ marginBottom: '10px' }}>{review.rating}</div>
                                    <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#555' }}>"{review.text}"</p>
                                    <h5 style={{ fontWeight: '600' }}>{review.name}</h5>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
