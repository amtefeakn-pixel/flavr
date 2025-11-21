import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
    return (
        <>
            <Header />
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
                <div className="container">
                    <h1 style={{ textAlign: 'center', margin: '40px 0', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>Our Products</h1>
                    <ProductGrid />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Products;
