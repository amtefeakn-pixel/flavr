import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    const footerStyle = {
        backgroundColor: '#333',
        color: 'white',
        padding: '60px 0 20px',
        marginTop: 'auto',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px',
    };

    const headingStyle = {
        color: 'var(--color-primary)',
        marginBottom: '20px',
        fontSize: '18px',
    };

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const linkStyle = {
        color: '#ccc',
        transition: 'color 0.3s ease',
    };

    return (
        <footer style={footerStyle}>
            <div className="container">
                <div style={gridStyle}>
                    {/* Column 1: Menu */}
                    <div>
                        <h4 style={headingStyle}>{t('footer.menu')}</h4>
                        <div style={listStyle}>
                            <Link to="/" style={linkStyle}>{t('header.home')}</Link>
                            <Link to="/products" style={linkStyle}>{t('header.products')}</Link>
                            <Link to="/about-us" style={linkStyle}>{t('header.about')}</Link>
                            <Link to="/sss" style={linkStyle}>Sıkça Sorulan Sorular</Link>
                            <Link to="/contact" style={linkStyle}>{t('header.contact')}</Link>
                        </div>
                    </div>

                    {/* Column 2: Contact */}
                    <div>
                        <h4 style={headingStyle}>{t('footer.contact')}</h4>
                        <div style={listStyle}>
                            <p style={{ color: '#ccc' }}>flavr@flavrtr.info</p>
                            <p style={{ color: '#ccc' }}>+1 (555) 123-4567</p>
                            <p style={{ color: '#ccc' }}>123 Fresh St, Water City</p>
                        </div>
                    </div>


                </div>

                <div style={{ borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '14px', color: '#888' }}>
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
