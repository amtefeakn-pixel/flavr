import React from 'react';

const WhereToBuy = () => {
    const sectionStyle = {
        padding: '60px 40px',
        backgroundColor: '#f0fdfa', // Light turquoise bg
        borderRadius: '20px',
        textAlign: 'center',
        marginBottom: '80px',
    };

    const logoGridStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        marginTop: '30px',
        alignItems: 'center',
    };

    const logoStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#555',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
    };

    const retailers = [
        { name: 'Trendyol', url: 'https://www.trendyol.com/sr?q=flavr+water' },
        { name: 'Migros', url: 'https://www.migros.com.tr/arama?q=flavr+water' },
        { name: 'CarrefourSA', url: 'https://www.carrefoursa.com/arama/?q=flavr+water' },
        { name: 'Getir', url: 'https://getir.com/en/search?q=flavr+water' },
        { name: 'Amazon', url: 'https://www.amazon.com.tr/s?k=flavr+water' }
    ];

    return (
        <section style={sectionStyle}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--color-primary)' }}>Where to Buy</h3>
            <p style={{ color: '#666' }}>Find us at your favorite retailers.</p>

            <div style={logoGridStyle}>
                {retailers.map((retailer, index) => (
                    <a
                        key={index}
                        href={retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={logoStyle}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {retailer.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default WhereToBuy;
