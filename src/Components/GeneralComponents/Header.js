import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">MyApp</div>
      <nav className="header__nav">
        <ul>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        </ul>
      </nav>
      <div className="header__login">
        <NavLink to="/login">
          <button className="login-button">Login</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
