import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import WhereToBuy from '../components/WhereToBuy';

const FlavorDetailPage = () => {
    const { slug } = useParams();
    const { t } = useLanguage();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Mapping slug to translation key
    const slugToKey = {
        'limon-kabugu': 'lemon',
        'lemon-zest': 'lemon',
        'tarcin-baharati': 'cinnamon',
        'cinnamon-spice': 'cinnamon',
        'maydanoz-ferahligi': 'parsley',
        'parsley-freshness': 'parsley',
        // Fallback for old or mixed slugs
        'nane-ferahligi': 'parsley',
        'mint-fresh': 'parsley'
    };

    const productKey = slugToKey[slug];

    // Get image path based on key
    const getImagePath = (key) => {
        switch (key) {
            case 'lemon': return '/images/lemon-explosion.png?v=2';
            case 'cinnamon': return '/images/cinnamon-explosion.png?v=2';
            case 'parsley': return '/images/parsley-explosion.png'; // Ensure this file exists
            default: return '';
        }
    };

    if (!productKey) {
        return (
            <>
                <Header />
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                    <h2>{t('detail.not_found_title')}</h2>
                    <p>{t('detail.not_found_desc')}</p>
                    <Link to="/">
                        <Button>{t('detail.return_home')}</Button>
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    const pageStyle = {
        paddingTop: '120px',
        minHeight: '100vh',
        paddingBottom: '80px'
    };

    const heroStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '60px',
    };

    const imageStyle = {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        marginBottom: '30px',
        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
        animation: 'fadeIn 0.8s ease-out'
    };

    const sectionStyle = {
        marginBottom: '60px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        overflow: 'hidden'
    };

    const thStyle = {
        textAlign: 'left',
        padding: '15px 20px',
        borderBottom: '1px solid #eee',
        color: 'var(--color-primary)',
        width: '30%',
        fontWeight: '600'
    };

    const tdStyle = {
        padding: '15px 20px',
        borderBottom: '1px solid #eee',
        color: '#555',
    };

    return (
        <>
            <Header />
            <main style={pageStyle} className="container">
                {/* Hero Section */}
                <section style={heroStyle}>
                    <img
                        src={getImagePath(productKey)}
                        alt={t(`products.${productKey}.name`)}
                        style={imageStyle}
                        width="400"
                        height="400"
                        loading="eager"
                    />
                    <h1 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        color: 'var(--color-primary)',
                        marginBottom: '15px',
                        lineHeight: '1.2'
                    }}>
                        {t(`products.${productKey}.name`)}
                    </h1>
                    <p style={{
                        fontSize: '20px',
                        color: '#666',
                        maxWidth: '600px',
                        marginBottom: '30px',
                        lineHeight: '1.5'
                    }}>
                        {t(`products.${productKey}.desc`)}
                    </p>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button>{t('detail.buy_now')}</Button>
                        <Link to="/">
                            <Button variant="outline">{t('detail.back_to_menu')}</Button>
                        </Link>
                    </div>
                </section>

                {/* Aroma Story */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>{t('detail.origin_story')}</h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                        {t(`products.${productKey}.story`)}
                    </p>
                </section>

                {/* Benefits & Facts */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>{t('detail.benefits')}</h2>
                    <table style={tableStyle}>
                        <tbody>
                            <tr>
                                <th style={thStyle}>{t('detail.calories')}</th>
                                <td style={tdStyle}>0</td>
                            </tr>
                            <tr>
                                <th style={thStyle}>{t('detail.sugar')}</th>
                                <td style={tdStyle}>0g</td>
                            </tr>
                            <tr>
                                <th style={thStyle}>{t('detail.ingredients')}</th>
                                <td style={tdStyle}>{t(`products.${productKey}.ingredients`)}</td>
                            </tr>
                            <tr>
                                <th style={thStyle}>{t('detail.best_for')}</th>
                                <td style={tdStyle}>{t(`products.${productKey}.best_for`)}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Usage & Pairing */}
                <section style={sectionStyle}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>{t('detail.pairing')}</h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#555' }}>
                        {t(`products.${productKey}.pairing`)}
                    </p>
                </section>

                <WhereToBuy />
            </main>
            <Footer />
        </>
    );
};

export default FlavorDetailPage;
