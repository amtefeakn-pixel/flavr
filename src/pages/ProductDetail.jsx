import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FAQ from '../components/FAQ';
import WhereToBuy from '../components/WhereToBuy';

const ProductDetail = () => {
    const { id } = useParams();
    // In a real app, we'd fetch product data based on ID.
    // For now, we'll just mock it or show a generic template.

    const product = {
        name: 'Lemon Zest',
        description: 'A refreshing burst of citrus energy. Made with organic lemons and sparkling spring water.',
        color: 'var(--color-accent-yellow)',
        price: '$24.99 / 12-pack',
        nutrition: [
            { label: 'Calories', value: '0' },
            { label: 'Sugar', value: '0g' },
            { label: 'Sodium', value: '5mg' },
        ],
        ingredients: ['Carbonated Water', 'Natural Lemon Flavor', 'Citric Acid'],
    };

    const pageStyle = {
        paddingTop: '100px',
        minHeight: '100vh',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        marginBottom: '80px',
    };

    const imageStyle = {
        width: '100%',
        height: '500px',
        backgroundColor: '#f5f5f5',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
    };

    const infoStyle = {
        padding: '20px',
    };

    const titleStyle = {
        fontSize: '48px',
        color: product.color,
        marginBottom: '20px',
    };

    const priceStyle = {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#333',
    };

    const sectionTitleStyle = {
        fontSize: '24px',
        marginBottom: '20px',
        color: 'var(--color-primary)',
    };

    return (
        <>
            <Header />
            <main style={pageStyle} className="container">
                <div style={gridStyle}>
                    {/* Product Image */}
                    <div style={imageStyle}>
                        Product Image {id}
                    </div>

                    {/* Product Info */}
                    <div style={infoStyle}>
                        <h1 style={titleStyle}>{product.name}</h1>
                        <p style={priceStyle}>{product.price}</p>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>{product.description}</p>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                            <Button>Add to Cart</Button>
                            <Button variant="outline" style={{ backgroundColor: 'transparent', border: '2px solid #ddd', color: '#333' }}>Subscribe & Save</Button>
                        </div>

                        <div>
                            <h3 style={sectionTitleStyle}>Ingredients</h3>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '30px', color: '#666' }}>
                                {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Nutrition & Details */}
                <div style={{ marginBottom: '80px', backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '20px' }}>
                    <h3 style={sectionTitleStyle}>Nutrition Facts</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                        {product.nutrition.map((item, i) => (
                            <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                                <div style={{ fontSize: '14px', color: '#999' }}>{item.label}</div>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <FAQ />
                <WhereToBuy />
            </main>
            <Footer />
        </>
    );
};

export default ProductDetail;
