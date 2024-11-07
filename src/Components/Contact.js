import React, { useState } from 'react';

import Header from './GeneralComponents/Header';
import Footer from './GeneralComponents/Footer';

import './Contact.scss';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', form);
  };

  return (
    <>
        <Header />
            <div className="contact">
            <h1>Contact Us</h1>
            <p>If you have any questions or feedback, feel free to reach out to us. We'd love to hear from you!</p>
            <form onSubmit={handleSubmit} className="contact__form">
                <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                />
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                />
                <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                />
                <button type="submit">Send Message</button>
            </form>
            </div>
        <Footer />
    </>
  );
}

export default Contact;
