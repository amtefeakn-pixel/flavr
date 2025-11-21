import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';
import { scrollToSection } from '../utils/scroll';
import ScrollReveal from './ScrollReveal';

const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleDiscoverClick = () => {
        scrollToSection('product-section');
    };

    const heroStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '90vh',
        paddingTop: '80px', // For fixed header
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9', // Fallback
    };

    const contentStyle = {
        flex: 1,
        paddingRight: '50px',
        zIndex: 2,
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`, // Layer 3: Moves most (opposite direction)
        transition: 'transform 0.1s ease-out'
    };

    const imageContainerStyle = {
        flex: 1,
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`, // Layer 2: Moves moderately
        transition: 'transform 0.1s ease-out'
    };

    const sloganStyle = {
        fontSize: 'clamp(42px, 5vw, 60px)',
        color: 'var(--color-text)',
        marginBottom: '20px',
        lineHeight: 1.1,
    };

    const sublineStyle = {
        fontSize: '18px',
        color: 'var(--color-text-light)',
        marginBottom: '30px',
        maxWidth: '450px',
    };

    // Background shapes (abstract fruit shapes)
    // Background shapes (abstract fruit shapes)
    const shapeStyle = {
        position: 'absolute',
        borderRadius: '50%',
        opacity: 0.6,
        zIndex: 1,
        transition: 'transform 0.2s ease-out'
    };

    return (
        <section style={heroStyle} className="container hero-section">
            {/* Water Wave Background */}
            <div className="wave-container">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
            </div>

            {/* Image Side */}
            <div style={imageContainerStyle} className="hero-image">
                <ScrollReveal delay={0.2}>
                    {/* Placeholder for Bottle Image - Using background image for better cover fit */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop")', // Placeholder real image
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}>
                    </div>
                </ScrollReveal>
            </div>

            {/* Text Side (Right) */}
            <div style={contentStyle} className="hero-content">
                <ScrollReveal>
                    <h1 style={sloganStyle}>{t('hero.slogan_start')} <br /><span className="text-gradient">{t('hero.slogan_highlight')}</span></h1>
                    <p style={sublineStyle}>{t('hero.subline')}</p>
                    <Button onClick={handleDiscoverClick}>{t('hero.cta')}</Button>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Hero;
