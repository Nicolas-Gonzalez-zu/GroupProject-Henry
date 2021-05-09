import React from 'react';

import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ShoppingCart from './ShoppingCart';
import SupportItem from './SupportItem';
import * as action from '../../actions/creators';

const NavBar = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    action.logout(dispatch);
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
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
            onClick={logout}
          >
            <span className="m-2">Log out</span>
            <i className="fas fa-door-open" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
