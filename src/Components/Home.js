import React from 'react';

import Header from './GeneralComponents/Header';
import Footer from './GeneralComponents/Footer';

import './Home.scss';

function Home() {
  return (
    <>
        <Header />
        <main className="home">
            <section className="home__intro">
                <h1>Welcome to MyApp</h1>
                <p>Your one-stop solution for managing tasks efficiently and staying organized. With an intuitive interface and powerful features, MyApp makes it easy to stay on top of your to-dos.</p>
            </section>

            <section className="home__features">
                <h2>Key Features</h2>
                <div className="home__features-grid">
                <div className="feature-card">
                    <h3>Easy Task Management</h3>
                    <p>Organize your tasks with just a few clicks. Add, edit, delete, and mark tasks as complete with ease.</p>
                </div>
                <div className="feature-card">
                    <h3>Stay in Sync</h3>
                    <p>Access your to-do list from anywhere, on any device, and stay in sync with real-time updates.</p>
                </div>
                <div className="feature-card">
                    <h3>Customizable Categories</h3>
                    <p>Organize tasks into categories to keep track of your personal, work, or hobby projects separately.</p>
                </div>
                </div>
            </section>
        </main>
        <Footer />
    </>
  );
}

export default Home;
