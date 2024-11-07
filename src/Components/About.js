import React from 'react';

import Header from './GeneralComponents/Header';
import Footer from './GeneralComponents/Footer';

import './About.scss';

function About() {
  return (
    <>
        <Header />
            <div className="about">
            <h1>About Us</h1>
            <p>Welcome to MyApp! We are dedicated to delivering the best experience to our users through our innovative platform. Our team works hard to bring you the best in class service with user-friendly features.</p>
            <p>We believe in constant improvement and value the feedback of our users, ensuring that we grow and evolve with your needs in mind.</p>
            </div>
        <Footer />
    </>
  );
}

export default About;
