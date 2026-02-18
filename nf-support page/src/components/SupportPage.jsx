import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './SupportPage.css';

const SupportPage = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Basic validation
        const formData = new FormData(form.current);
        const userEmail = formData.get('user_email');
        if (!userEmail || !userEmail.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            setLoading(false);
            return;
        }

        // Replace with your EmailJS service ID, template ID, and public key
        // You should get these from your EmailJS dashboard
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
                publicKey: PUBLIC_KEY,
            })
            .then(
                () => {
                    setLoading(false);
                    setMessage({ type: 'success', text: 'Message sent successfully!' });
                    form.current.reset();
                },
                (error) => {
                    setLoading(false);
                    setMessage({ type: 'error', text: 'Failed to send message. Please try again later.' });
                    console.error('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="support-container">
            <div className="support-card">
                <h2 className="title">HERO SUPPORT</h2>
                <p className="subtitle">SEND A SIGNAL TO HEADQUARTERS!</p>

                <form ref={form} onSubmit={sendEmail} className="support-form">
                    <div className="input-group">
                        <label htmlFor="user_name">Secret Identity (Name)</label>
                        <input type="text" name="user_name" id="user_name" placeholder="PETER PARKER" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="user_email">Comms Channel (Email)</label>
                        <input type="email" name="user_email" id="user_email" placeholder="spidey@avengers.com" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="message">Mission Query</label>
                        <textarea name="message" id="message" rows="5" placeholder="WHAT'S THE MISSION, CAP?" required></textarea>
                    </div>

                    <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
                        {loading ? 'SENDING SIGNAL...' : 'ASSEMBLE!'}
                    </button>

                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SupportPage;
