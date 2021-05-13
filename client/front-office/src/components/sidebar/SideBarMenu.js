import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavDropdown, DropdownButton } from 'react-bootstrap';

const SideBarMenu = () => (
  <nav className="mt-2">
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      {' '}
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">
           <i className="nav-icon fas fa-chess-knight text-warning" />
          <p>
             Account PRO
            <span className="right badge badge-warning">New</span>
          </p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/wallet" className="nav-link">
          <i className="nav-icon fas fa-wallet" />
          <p> Wallet</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/budget" className="nav-link">
          <i className="nav-icon fas fa-file-contract" />
          <p> Budget</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/movements"
          className="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseExample2"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="nav-icon fas fa-hand-holding-usd" />
          <p> Movements</p>
        </NavLink>
        <ul
          data-widget="treeview "
          role="menu"
          data-accordion="false"
          id="collapseExample2"
          className="collapse"
        >
          <li>
            <NavLink to="/income">
              <i className="nav-icon fas fa-file-invoice" />
              Income
            </NavLink>
          </li>
          <li>
            <NavLink to="/transfer">
              <i className="nav-icon fas fa-file-alt" />
              Transfers
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <NavLink to="/reports" className="nav-link">
          <i className="nav-icon fas fa-chart-line" />
          <p> Reports</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/shop"
          className="nav-link"
          data-toggle="collapse"
          data-target="#collapseExample1"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="nav-icon fas fa-shopping-cart" />
          <p> Shop</p>
        </NavLink>
        <ul data-widget="treeview" role="menu" data-accordion="false" id="collapseExample1">
          <li>
            <NavLink to="/invoices">
              <i className="nav-icon fas fa-file-invoice" />
              Invoices
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <i className="nav-icon fas fa-file-alt" />
              Services
            </NavLink>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <NavLink to="/orders" className="nav-link">
           <i className="nav-icon fas fa-file-invoice-dollar" />
          <p>Orders</p>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">
           <i className="nav-icon fas fa-user-tie" />
          <p>Profile</p>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default SideBarMenu;
