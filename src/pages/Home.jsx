import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ProcessSection from '../components/ProcessSection';
import SocialProof from '../components/SocialProof';

import ContactSection from '../components/ContactSection';
import FlavorAirSection from '../components/FlavorAirSection';

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <div id="hero-section"><Hero /></div>
                <FlavorAirSection />
                <div id="product-section"><ProductGrid /></div>
                <div id="process-section"><ProcessSection /></div>
                <div id="reviews-section"><SocialProof /></div>

                <div id="contact-section"><ContactSection /></div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
