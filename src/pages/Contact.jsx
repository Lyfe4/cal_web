import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLocation } from 'react-router';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import { MapPinIcon, MailIcon, PhoneIcon, ClockIcon, CheckIcon } from '../components/Icons';
import { isValidName, isValidPhone } from '../utils/contactValidation';
import '../styles/Contact.css';

const PACKAGE_SUBJECTS = {
  starter: 'Starter Package Inquiry',
  professional: 'Professional Package Inquiry',
  custom: 'Custom Project or Contract Work',
};

const Contact = () => {
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Calvin R Development',
    description:
      'Get in touch with Calvin R Development for professional frontend web development services in Armidale, NSW and remotely across Australia.',
    mainEntity: {
      '@type': 'ProfessionalService',
      name: 'Calvin R Development',
      telephone: '+61 447 576 460',
      email: 'calvin@calvinrdevelopment.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Armidale',
        addressRegion: 'NSW',
        postalCode: '2350',
        addressCountry: 'Australia',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    },
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const packageType = searchParams.get('package');
  const [formspreeState, handleFormspreeSubmit] = useForm('xqakqbgp');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: PACKAGE_SUBJECTS[packageType] || '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (!isValidName(value)) return 'First name must be at least 2 characters long';
        break;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (!isValidName(value)) return 'Last name must be at least 2 characters long';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!isValidPhone(value)) return 'Please enter a valid Australian phone number';
        break;
      case 'subject':
        if (!value) return 'Please select a subject';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters long';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);

    // Fields are checked in form order, so the first error is the first field on screen
    const firstInvalid = Object.keys(newErrors)[0];
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();

    if (Object.keys(newErrors).length === 0) {
      await handleFormspreeSubmit({ ...formData, subject: formData.subject });
    }
  };

  // Clear the form once Formspree confirms the send (adjusted during render rather
  // than in an effect). Keyed on `result` rather than `succeeded`: `succeeded` stays
  // true after the first send, so a second message would never clear, while
  // `result` is a new object on every successful send.
  const [prevResult, setPrevResult] = useState(formspreeState.result);
  if (formspreeState.result !== prevResult) {
    setPrevResult(formspreeState.result);
    if (formspreeState.result) {
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    }
  }

  // Errors not tied to a field (network failure, rate limit, blocked submission)
  const hasFormError = (formspreeState.errors?.getFormErrors().length ?? 0) > 0;

  const fieldA11y = (name) =>
    errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` } : {};

  const contactItems = [
    { icon: <MapPinIcon size={20} />, label: 'Location', value: 'Armidale, NSW 2350' },
    {
      icon: <MailIcon size={20} />,
      label: 'Email',
      value: 'calvin@calvinrdevelopment.com',
      href: 'mailto:calvin@calvinrdevelopment.com',
    },
    {
      icon: <PhoneIcon size={20} />,
      label: 'Phone',
      value: '+61 447 576 460',
      href: 'tel:+61447576460',
    },
    { icon: <ClockIcon size={20} />, label: 'Hours', value: 'Mon–Fri, 9am–5pm' },
  ];

  return (
    <div className="contact-page">
      <SEO
        title="Contact Calvin R Development | Web Developer in Armidale"
        description="Get in touch with Calvin R Development for professional frontend web development services in Armidale, NSW. Available for remote work across Australia."
        canonicalUrl="/contact"
        keywords="contact web developer, Armidale web development, hire frontend developer, web development inquiry, Calvin R Development contact"
        structuredData={contactStructuredData}
      />

      <section className="page-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            Get in touch
          </Reveal>
          <Reveal as="h1" delay={0.05}>
            Let's build <span className="gradient-text">something great</span>
          </Reveal>
          <Reveal as="p" delay={0.1}>
            Have a project in mind? Tell me about it and I'll get back to you within one business
            day.
          </Reveal>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <Reveal className="contact-info">
              <h2>Contact information</h2>
              <p className="contact-intro">Prefer to reach out directly? Here's how to find me.</p>
              <div className="info-list">
                {contactItems.map((item) => (
                  <div key={item.label} className="info-item">
                    <div className="info-item-icon">{item.icon}</div>
                    <div className="info-item-content">
                      <h3>{item.label}</h3>
                      {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal className="contact-form glass-card" delay={0.1} id="contact-form">
              <h2>Send a message</h2>
              {/* Always mounted so screen readers announce the message when it appears */}
              <div role="status">
                {formspreeState.succeeded && (
                  <div className="success-message">
                    <CheckIcon size={18} /> Thank you! I'll get back to you soon.
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      value={formData.firstName}
                      onChange={handleChange}
                      {...fieldA11y('firstName')}
                    />
                    {errors.firstName && (
                      <div id="firstName-error" className="error-message">
                        {errors.firstName}
                      </div>
                    )}
                    <ValidationError
                      prefix="First Name"
                      field="firstName"
                      errors={formspreeState.errors}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      value={formData.lastName}
                      onChange={handleChange}
                      {...fieldA11y('lastName')}
                    />
                    {errors.lastName && (
                      <div id="lastName-error" className="error-message">
                        {errors.lastName}
                      </div>
                    )}
                    <ValidationError
                      prefix="Last Name"
                      field="lastName"
                      errors={formspreeState.errors}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      {...fieldA11y('email')}
                    />
                    {errors.email && (
                      <div id="email-error" className="error-message">
                        {errors.email}
                      </div>
                    )}
                    <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      {...fieldA11y('phone')}
                    />
                    {errors.phone && (
                      <div id="phone-error" className="error-message">
                        {errors.phone}
                      </div>
                    )}
                    <ValidationError prefix="Phone" field="phone" errors={formspreeState.errors} />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="subject">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className={`form-select ${errors.subject ? 'error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                      {...fieldA11y('subject')}
                    >
                      <option value="">Select a subject</option>
                      <option value="Starter Package Inquiry">Starter Package Inquiry</option>
                      <option value="Professional Package Inquiry">
                        Professional Package Inquiry
                      </option>
                      <option value="Custom Project or Contract Work">
                        Custom Project or Contract Work
                      </option>
                      <option value="General Question">General Question</option>
                    </select>
                    {errors.subject && (
                      <div id="subject-error" className="error-message">
                        {errors.subject}
                      </div>
                    )}
                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={formspreeState.errors}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      {...fieldA11y('message')}
                    />
                    {errors.message && (
                      <div id="message-error" className="error-message">
                        {errors.message}
                      </div>
                    )}
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={formspreeState.errors}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit btn-full-width"
                  disabled={formspreeState.submitting}
                >
                  {formspreeState.submitting ? 'Sending…' : 'Send Message'}
                </button>
                {hasFormError && (
                  <div className="form-error-message" role="alert">
                    Sorry, your message couldn't be sent. Please try again, or email me at{' '}
                    <a href="mailto:calvin@calvinrdevelopment.com">calvin@calvinrdevelopment.com</a>
                    .
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
