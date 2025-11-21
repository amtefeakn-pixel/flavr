import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

import ScrollToTop from './utils/ScrollToTop';
import Header from './components/Header';
import GlobalWaterBackground from './components/GlobalWaterBackground';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const FlavorDetailPage = lazy(() => import('./pages/FlavorDetailPage'));
const Products = lazy(() => import('./pages/Products'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

// Loading component
const Loading = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--color-primary)' }}>
    Loading...
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app-wrapper fade-in">
          <ScrollToTop />
          <GlobalWaterBackground />
          <Header />
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flavors/:slug" element={<FlavorDetailPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/sss" element={<FAQPage />} />
              <Route path="/contact" element={<Home />} /> {/* Fallback to Home contact section */}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
