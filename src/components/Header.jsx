import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';
import { scrollToSection } from '../utils/scroll';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (sectionId, path = '/') => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate(path);
            // Optional: Wait for navigation then scroll (requires more complex logic or timeout)
            setTimeout(() => scrollToSection(sectionId), 100);
        } else {
            scrollToSection(sectionId);
        }
    };

    const headerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        padding: isScrolled ? '10px 0' : '20px 0',
    };

    const navContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyle = {
        fontSize: '24px',
        fontWeight: '700',
        color: isScrolled ? 'var(--color-text)' : 'var(--color-primary)',
        fontFamily: 'var(--font-heading)',
        cursor: 'pointer',
        textDecoration: 'none'
    };

    const linkStyle = {
        margin: '0 15px',
        fontWeight: '500',
        color: isScrolled ? 'var(--color-text)' : '#333', // Darker on transparent for visibility if bg is light
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        fontFamily: 'var(--font-body)'
    };

    const langButtonStyle = {
        background: 'none',
        border: '1px solid var(--color-primary)',
        borderRadius: '20px',
        padding: '5px 15px',
        cursor: 'pointer',
        marginLeft: '15px',
        color: isScrolled ? 'var(--color-text)' : 'var(--color-text)',
        fontWeight: 'bold',
        fontSize: '14px',
    };

    return (
        <header style={headerStyle} className={isMenuOpen ? 'mobile-menu-open' : ''}>
            <div className="container" style={navContainerStyle}>
                <div style={logoStyle} onClick={() => handleNavigation('hero-section')}>
                    FLAVR
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <nav className="nav-links">
                    <button style={linkStyle} onClick={() => handleNavigation('hero-section')}>{t('header.home')}</button>
                    <button style={linkStyle} onClick={() => handleNavigation('product-section', '/products')}>{t('header.products')}</button>
                    <Link to="/about-us" style={{ ...linkStyle, textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>{t('header.about')}</Link>
                    <button style={linkStyle} onClick={() => handleNavigation('contact-section')}>{t('header.contact')}</button>
                    <Button onClick={() => handleNavigation('product-section')}>{t('header.discover')}</Button>
                    <button style={langButtonStyle} onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}>
                        {language === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
