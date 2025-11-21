import React, { useState } from 'react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';

import { sanitizeInput, validateEmail } from '../utils/security';

const ContactSection = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        submitting: false,
        succeeded: false,
        error: null
    });
    const [lastSubmitTime, setLastSubmitTime] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Sanitize input on change to prevent pasting of malicious scripts
        // Note: For better UX, we might only sanitize on submit, but this is safer
        // We'll allow normal typing but strip dangerous chars effectively
        // For this implementation, we will just update state and sanitize on submit
        // to avoid interfering with typing (e.g. typing ' & ' might get escaped too early)
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Rate Limiting: Prevent submissions faster than 1 every 10 seconds
        const now = Date.now();
        if (now - lastSubmitTime < 10000) {
            setStatus({ submitting: false, succeeded: false, error: 'Please wait a few seconds before sending another message.' });
            return;
        }
        setLastSubmitTime(now);

        setStatus({ submitting: true, succeeded: false, error: null });

        // Input Sanitization & Validation
        const cleanName = sanitizeInput(formData.name);
        const cleanEmail = sanitizeInput(formData.email); // Basic strip
        const cleanMessage = sanitizeInput(formData.message);

        if (!cleanName || !cleanEmail || !cleanMessage) {
            setStatus({ submitting: false, succeeded: false, error: 'Please fill in all fields.' });
            return;
        }

        if (!validateEmail(cleanEmail)) {
            setStatus({ submitting: false, succeeded: false, error: 'Please enter a valid email address.' });
            return;
        }

        const submissionData = {
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage
        };

        try {
            // Using Formspree for guaranteed external submission
            // Using env variable if available, fallback to hardcoded for now (will be moved to env in next step)
            const formId = import.meta.env.VITE_FORMSPREE_ID || "xpwbbayj";
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setStatus({ submitting: false, succeeded: true, error: null });
                setFormData({ name: '', email: '', message: '' });
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    // Generic error message for security
                    setStatus({ submitting: false, succeeded: false, error: "Submission failed. Please check your inputs." });
                } else {
                    setStatus({ submitting: false, succeeded: false, error: 'Something went wrong. Please try again.' });
                }
            }
        } catch (error) {
            setStatus({ submitting: false, succeeded: false, error: 'Network error. Please try again later.' });
        }
    };

    const sectionStyle = {
        padding: '80px 0',
        backgroundColor: '#f9f9f9',
        id: 'contact-section'
    };

    const formContainerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    };

    const inputGroupStyle = {
        marginBottom: '20px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
    };

    return (
        <section style={sectionStyle} id="contact-section">
            <div className="container">
                <ScrollReveal>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ color: 'var(--color-primary)' }}>{t('contact.title')}</h2>
                        <p style={{ color: '#666' }}>{t('contact.subtitle')}</p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <div style={formContainerStyle}>
                        {status.succeeded ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-primary)' }}>
                                <h3 style={{ marginBottom: '10px' }}>{t('contact.success_title')}</h3>
                                <p>{t('contact.success_message')}</p>
                                <Button onClick={() => setStatus({ ...status, succeeded: false })} style={{ marginTop: '20px' }}>{t('contact.send_another')}</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} action="https://formspree.io/f/xpwbbayj" method="POST">
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle} htmlFor="name">{t('contact.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder={t('contact.name_placeholder')}
                                        required
                                    />
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle} htmlFor="email">{t('contact.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder={t('contact.email_placeholder')}
                                        required
                                    />
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle} htmlFor="message">{t('contact.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                                        placeholder={t('contact.message_placeholder')}
                                        required
                                    ></textarea>
                                </div>

                                {status.error && (
                                    <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{status.error}</p>
                                )}

                                <div style={{ textAlign: 'center' }}>
                                    <Button type="submit" disabled={status.submitting}>
                                        {status.submitting ? 'Sending...' : t('contact.send')}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactSection;
