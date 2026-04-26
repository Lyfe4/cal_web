import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import ScrollAnimation from '../components/ScrollAnimation';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/Contact.css';

const Contact = () => {
    // SEO structured data for contact page
    const contactStructuredData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Calvin R Development",
        "description": "Get in touch with Calvin R Development for professional frontend web development services in Armidale, NSW and remotely across Australia.",
        "mainEntity": {
            "@type": "ProfessionalService",
            "name": "Calvin R Development",
            "telephone": "+61 447 576 460",
            "email": "calvin@calvinrdevelopment.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Armidale",
                "addressRegion": "NSW",
                "postalCode": "2350",
                "addressCountry": "Australia"
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
            }
        }
    };

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const packageType = searchParams.get('package');
    const [formspreeState, handleFormspreeSubmit] = useForm("xqakqbgp");
  
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: packageType === 'basic-package' ? 'Basic Package Inquiry' : 
              packageType === 'deluxe-package' ? 'Deluxe Package Inquiry' : '',
      message: ''
    });

    const [errors, setErrors] = useState({});

    // Validation helper functions
    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z\s]{2,}$/;
        return nameRegex.test(name.trim());
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        if (!phone) return true;
        const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return phoneRegex.test(phone);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
                if (!value.trim()) {
                    return 'First name is required';
                } else if (!isValidName(value)) {
                    return 'First name must be at least 2 characters long and contain only letters';
                }
                break;
            
            case 'lastName':
                if (!value.trim()) {
                    return 'Last name is required';
                } else if (!isValidName(value)) {
                    return 'Last name must be at least 2 characters long and contain only letters';
                }
                break;
            
            case 'email':
                if (!value.trim()) {
                    return 'Email is required';
                } else if (!isValidEmail(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            
            case 'phone':
                if (value.trim() && !isValidPhone(value)) {
                    return 'Please enter a valid phone number';
                }
                break;
            
            case 'subject':
                if (!value) {
                    return 'Please select a subject';
                }
                break;
            
            case 'message':
                if (!value.trim()) {
                    return 'Message is required';
                } else if (value.trim().length < 10) {
                    return 'Message must be at least 10 characters long';
                }
                break;
            
            default:
                return '';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation feedback
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Perform validation
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);

        // If validation passes, submit to Formspree
        if (Object.keys(newErrors).length === 0) {
            await handleFormspreeSubmit({
                ...formData,
                subject: formData.subject,
            });
            
            // If submission was successful, reset form
            if (formspreeState.succeeded) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setErrors({});
            }
        }
    };

    return (
        <div className="contact-page">
            <SEO 
                title="Contact Calvin R Development | Web Developer in Armidale"
                description="Get in touch with Calvin R Development for professional frontend web development services in Armidale, NSW. Available for remote work across Australia."
                canonicalUrl="/contact"
                keywords="contact web developer, Armidale web development, hire frontend developer, web development inquiry, Calvin R Development contact"
                structuredData={contactStructuredData}
            />
            <section className="contact-hero">
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>Have a project in mind? Let's work together to bring your vision to life.</p>
                </div>
            </section>

            <ScrollAnimation animation="fade-in">
                <section className="contact-section">
                    <div className="container">
                        <div className="contact-grid">
                            <div className="contact-info">
                                <h2>Contact Information</h2>
                                <div className="info-item">
                                    <div className="info-item-icon">📍</div>
                                    <div className="info-item-content">
                                        <h3>Location</h3>
                                        <p>Armidale, 2350</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-item-icon">📧</div>
                                    <div className="info-item-content">
                                        <h3>Email</h3>
                                        <p>calvin@calvinrdevelopment.com</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-item-icon">📱</div>
                                    <div className="info-item-content">
                                        <h3>Phone</h3>
                                        <p>+61 447 576 460</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form">
                                <h2>Send a Message</h2>
                                {formspreeState.succeeded && (
                                    <div className="success-message">
                                        Thank you for your message! I'll get back to you soon.
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="firstName">First Name *</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`form-input ${errors.firstName ? 'error' : ''}`}
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                                            <ValidationError prefix="First Name" field="firstName" errors={formspreeState.errors} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="lastName">Last Name *</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`form-input ${errors.lastName ? 'error' : ''}`}
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                            <ValidationError prefix="Last Name" field="lastName" errors={formspreeState.errors} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`form-input ${errors.email ? 'error' : ''}`}
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <div className="error-message">{errors.email}</div>}
                                            <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="phone">Phone (Optional)</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className={`form-input ${errors.phone ? 'error' : ''}`}
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                                            <ValidationError prefix="Phone" field="phone" errors={formspreeState.errors} />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label" htmlFor="subject">Subject *</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                className={`form-select ${errors.subject ? 'error' : ''}`}
                                                value={formData.subject}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="Basic Package Inquiry">Basic Package Inquiry</option>
                                                <option value="Deluxe Package Inquiry">Deluxe Package Inquiry</option>
                                                <option value="General Question">General Question</option>
                                            </select>
                                            {errors.subject && <div className="error-message">{errors.subject}</div>}
                                            <ValidationError prefix="Subject" field="subject" errors={formspreeState.errors} />
                                        </div>

                                        <div className="form-group full-width">
                                            <label className="form-label" htmlFor="message">Message *</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                className={`form-textarea ${errors.message ? 'error' : ''}`}
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                            {errors.message && <div className="error-message">{errors.message}</div>}
                                            <ValidationError prefix="Message" field="message" errors={formspreeState.errors} />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="form-submit"
                                        disabled={formspreeState.submitting}
                                    >
                                        {formspreeState.submitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollAnimation>
        </div>
    );
};

export default Contact;
