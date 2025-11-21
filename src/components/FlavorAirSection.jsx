import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FlavorAirSection = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const sectionHeight = rect.height;

            // Calculate progress based on how much of the section has been scrolled
            // Start counting when top of section hits top of viewport
            // End when bottom of section hits bottom of viewport (or slightly before)

            let newProgress = (viewportHeight - rect.top) / (sectionHeight);

            // Clamp progress between 0 and 1
            newProgress = Math.max(0, Math.min(1, newProgress));

            setProgress(newProgress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Styles
    const sectionStyle = {
        height: '300vh', // Long scroll track
        position: 'relative',
        backgroundColor: '#fff',
    };

    const stickyContainerStyle = {
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    };

    // Animation calculations based on progress
    // Text fades in from 0.1 to 0.4
    const textOpacity = Math.max(0, Math.min(1, (progress - 0.1) * 3.3));
    const textTransform = `translateY(${50 - (textOpacity * 50)}px)`;

    // Visual scales up from 0.2 to 0.6
    const visualScale = 0.8 + (Math.max(0, Math.min(1, (progress - 0.2) * 2.5)) * 0.4);
    const visualOpacity = Math.max(0, Math.min(1, (progress - 0.1) * 4));
    const visualRotate = Math.max(0, Math.min(1, (progress - 0.2) * 2)) * 15; // 15 deg rotation

    // Air/Ring effect
    const ringScale = 1 + (Math.max(0, Math.min(1, (progress - 0.4) * 2)) * 1.5);
    const ringOpacity = Math.max(0, Math.min(1, (progress - 0.4) * 4)) * (1 - Math.max(0, (progress - 0.8) * 5)); // Fade out at end

    return (
        <section ref={sectionRef} style={sectionStyle}>
            <div style={stickyContainerStyle}>

                {/* Visual Element (Bottle/Pod) */}
                <div style={{
                    position: 'relative',
                    width: '300px',
                    height: '300px',
                    marginBottom: '40px',
                    opacity: visualOpacity,
                    transform: `scale(${visualScale}) rotate(${visualRotate}deg)`,
                    transition: 'transform 0.1s linear, opacity 0.1s linear', // Smooth direct mapping
                    zIndex: 2
                }}>
                    {/* Placeholder for Pod/Bottle Visual */}
                    {/* Bottle Animation Container */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* Bottle Body */}
                        <div style={{
                            width: '80px',
                            height: '200px',
                            border: '4px solid #4dd0e1',
                            borderRadius: '10px 10px 20px 20px',
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.3)',
                            transform: `rotate(${Math.sin(progress * Math.PI * 4) * 5}deg)`, // Slight sway
                            transition: 'transform 0.1s linear'
                        }}>
                            {/* Water Level */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: `${Math.max(10, 90 - (progress * 100))}%`, // Decreases as you scroll
                                background: 'linear-gradient(to top, #4dd0e1, #80deea)',
                                transition: 'height 0.1s linear',
                                opacity: 0.8
                            }}>
                                {/* Bubbles */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    left: '20%',
                                    width: '10px',
                                    height: '10px',
                                    background: 'rgba(255,255,255,0.6)',
                                    borderRadius: '50%',
                                    animation: 'float-up 2s infinite'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '60%',
                                    width: '6px',
                                    height: '6px',
                                    background: 'rgba(255,255,255,0.6)',
                                    borderRadius: '50%',
                                    animation: 'float-up 1.5s infinite 0.5s'
                                }}></div>
                            </div>

                            {/* Bottle Neck */}
                            <div style={{
                                position: 'absolute',
                                top: '-25px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '30px',
                                height: '25px',
                                border: '4px solid #4dd0e1',
                                borderBottom: 'none',
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '5px 5px 0 0'
                            }}></div>
                            {/* Bottle Cap */}
                            <div style={{
                                position: 'absolute',
                                top: '-35px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '34px',
                                height: '10px',
                                background: '#4dd0e1',
                                borderRadius: '3px'
                            }}></div>
                        </div>
                    </div>

                    {/* Air Ring Effect */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${ringScale})`,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '4px solid rgba(77, 208, 225, 0.3)',
                        opacity: ringOpacity,
                        zIndex: -1,
                        pointerEvents: 'none'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${ringScale * 0.8})`,
                        width: '80%',
                        height: '80%',
                        borderRadius: '50%',
                        border: '2px solid rgba(77, 208, 225, 0.5)',
                        opacity: ringOpacity,
                        zIndex: -1,
                        pointerEvents: 'none'
                    }}></div>
                </div>

                {/* Text Content */}
                <div style={{
                    opacity: textOpacity,
                    transform: textTransform,
                    transition: 'transform 0.1s linear, opacity 0.1s linear',
                    zIndex: 3,
                    maxWidth: '800px',
                    padding: '0 20px'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(40px, 6vw, 80px)',
                        fontWeight: '900',
                        color: '#333',
                        lineHeight: '1.1',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '-2px'
                    }}>
                        {t('about.air_flavor.title')}
                    </h2>
                    <p style={{
                        fontSize: '24px',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {t('about.air_flavor.subtitle')}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default FlavorAirSection;
