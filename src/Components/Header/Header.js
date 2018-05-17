import './Header.css';
import React, { Component } from 'react';
import Logo from '../../img/logo.png';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <img src={Logo} alt="Logo" className="logo" />
          <form className="search">
            <input className="search__input" type="text" name="name" />
            <input className="search__button" type="submit" value="Search" />
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
