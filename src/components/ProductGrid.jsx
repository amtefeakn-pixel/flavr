import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

const ProductCard = ({ product, t, ingredients }) => {
    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        overflow: 'hidden', // Keep ingredients inside
    };

    const imageStyle = {
        width: '150px',
        height: '200px',
        borderRadius: '10px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 2,
        objectFit: 'contain',
    };

    return (
        <div style={cardStyle} className="product-card flavor-card-container">
            {ingredients}
            <div className="flavor-visual-area">
                <img
                    src={product.image}
                    alt={t(`products.${product.key}.name`)}
                    className="flavor-splash-image"
                />
            </div>
            <h3 style={{ marginBottom: '10px' }}>{t(`products.${product.key}.name`)}</h3>
            <p style={{ color: '#666', marginBottom: '20px', flex: 1 }}>{t(`products.${product.key}.desc`)}</p>
            <Link to={`/flavors/${product.slug}`} style={{ width: '100%' }}>
                <Button variant="outline" style={{ backgroundColor: 'transparent', border: `2px solid ${product.color}`, color: product.color, width: '100%' }}>
                    {t('products.view_details')}
                </Button>
            </Link>
        </div>
    );
};

const ProductGrid = () => {
    const { t } = useLanguage();

    const products = [
        { id: 1, key: 'lemon', color: 'var(--color-accent-yellow)', image: '/images/lemon-explosion.png?v=2', slug: 'limon-kabugu' },
        { id: 2, key: 'cinnamon', color: '#D2691E', image: '/images/cinnamon-explosion.png?v=2', slug: 'tarcin-baharati' },
        { id: 3, key: 'parsley', color: 'var(--color-primary)', image: '/images/parsley-explosion.png', slug: 'maydanoz-ferahligi' },
    ];

    const getIngredients = (key) => {
        switch (key) {
            case 'lemon':
                return (
                    <div className="ingredient-container">
                        <div className="ingredient ing-lemon" style={{ top: '5%', left: '5%', animationDelay: '0s' }}>🍋</div>
                        <div className="ingredient ing-lemon" style={{ top: '65%', right: '5%', animationDelay: '1s' }}>🍋</div>
                        <div className="ingredient ing-lemon" style={{ top: '25%', right: '25%', fontSize: '20px', animationDelay: '2s' }}>🍋</div>
                    </div>
                );
            case 'cinnamon':
                return (
                    <div className="ingredient-container">
                        <div className="ingredient ing-cinnamon" style={{ top: '15%', left: '5%', animationDelay: '0.5s' }}>🪵</div>
                        <div className="ingredient ing-cinnamon" style={{ top: '75%', right: '5%', animationDelay: '1.5s' }}>🍂</div>
                        <div className="ingredient ing-cinnamon" style={{ top: '35%', left: '70%', fontSize: '24px', animationDelay: '2.5s' }}>✨</div>
                    </div>
                );
            case 'parsley':
                return (
                    <div className="ingredient-container">
                        <div className="ingredient ing-parsley" style={{ top: '10%', right: '10%', animationDelay: '0.2s' }}>🌿</div>
                        <div className="ingredient ing-parsley" style={{ top: '70%', left: '5%', animationDelay: '1.2s' }}>🍃</div>
                        <div className="ingredient ing-parsley" style={{ top: '35%', left: '35%', fontSize: '22px', animationDelay: '2.2s' }}>🌿</div>
                    </div>
                );
            default:
                return null;
        }
    };

    const sectionStyle = {
        padding: '80px 0',
        backgroundColor: '#fff',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    };

    return (
        <section style={sectionStyle} className="container" id="product-section">
            <ScrollReveal>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '36px', color: 'var(--color-primary)' }}>{t('products.title')}</h2>
                    <p style={{ color: '#666' }}>{t('products.subtitle')}</p>
                </div>
            </ScrollReveal>

            <div style={gridStyle}>
                {products.map((product, index) => (
                    <ScrollReveal key={product.id} delay={index * 0.2}>
                        <div style={{ position: 'relative' }}> {/* Wrapper for positioning if needed */}
                            <ProductCard product={product} t={t} ingredients={getIngredients(product.key)} />
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
