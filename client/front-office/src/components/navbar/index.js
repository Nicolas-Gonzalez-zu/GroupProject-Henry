import React from 'react';
import ShoppingCart from './ShoppingCart';
import SupportItem from './SupportItem';

const NavBar = () => (
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav ">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="/" role="button">
          <i className="fas fa-bars" />
        </a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="./index3.html" className="nav-link">
          Home
        </a>
      </li>
      <SupportItem />
    </ul>

    <ul className="navbar-nav ml-auto">
      <ShoppingCart />
      <li className="nav-item">
        <a
          className="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="/"
          role="button"
        >
          <span className="m-2">Log out</span>
          <i className="fas fa-door-open" />
        </a>
      </li>
    </ul>
  </nav>
);

export default NavBar;
