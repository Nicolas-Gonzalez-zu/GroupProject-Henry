import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarMenu = () => (
  <nav className="mt-2">
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li className="nav-item">
        <NavLink to="/wallet" className="nav-link">
          <i className="nav-icon fas fa-wallet" />
          <p> Wallet</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/account" className="nav-link">
           <i className="nav-icon fas fa-file-powerpoint" />
          <p> Account</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/movements" className="nav-link">
          <i className="nav-icon fas fa-hand-holding-usd" />
          <p> Movements</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/reports" className="nav-link">
          <i className="nav-icon fas fa-chart-line" />
          <p> Reports</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/shop" className="nav-link">
          <i className="nav-icon fas fa-shopping-cart" />
          <p> Shop</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/services" className="nav-link">
           <i className="nav-icon fas fa-file-invoice-dollar" />
          <p> Services</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="../widgets.html" className="nav-link">
           <i className="nav-icon fas fa-chess-knight" />
          <p> Account PRO</p>
        </a>
      </li>
    </ul>
  </nav>
);

export default SideBarMenu;
