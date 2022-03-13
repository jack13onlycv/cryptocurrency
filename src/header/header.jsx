/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import HeaderCurency from '../header-curency/header-curency';
import Briefcase from '../briefcase/briefcase';
import './header.scss';

function Header() {
  return (
    <header>
      <div className="header">
        <div className="header__logo" />
        <div className="header__title">CryptoCurrency</div>
        <HeaderCurency />
        <Briefcase />
      </div>
    </header>
  );
}

export default Header;
