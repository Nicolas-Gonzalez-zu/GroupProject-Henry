import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const SideBarMenu = () => {
  const onMenuOPen = (e) => {
    if (e.target.tagName === 'I') {
      if (e.target.parentNode.parentNode.parentNode.classList.contains('menu-open')) {
        e.target.parentNode.parentNode.parentNode.classList.remove('menu-is-opening');
        e.target.parentNode.parentNode.parentNode.classList.remove('menu-open');
      } else {
        e.target.parentNode.parentNode.parentNode.classList.add('menu-is-opening');
        e.target.parentNode.parentNode.parentNode.classList.add('menu-open');
      }
    } else if (e.target.parentNode.classList.contains('menu-open')) {
      e.target.parentNode.classList.remove('menu-is-opening');
      e.target.parentNode.classList.remove('menu-open');
    } else {
      e.target.parentNode.classList.add('menu-is-opening');
      e.target.parentNode.classList.add('menu-open');
    }
  };
  return (
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
            <p> Wallet</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/budget" className="nav-link">
            <i className="nav-icon fas fa-file-contract" />
            <p> Budget</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link" data-target="#collapseExample2" onClick={onMenuOPen}>
            <i className="nav-icon fas fa-hand-holding-usd" />
            <p>
              Movements
              <i className="right fas fa-angle-left" data-target="#collapseExample2" />
            </p>
          </Link>
          <ul
            data-widget="treeview "
            role="menu"
            data-accordion="false"
            id="collapseExample2"
            className="nav nav-treeview"
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
            <p> Reports</p>
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
            <p> Shop</p>
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
};
export default SideBarMenu;
