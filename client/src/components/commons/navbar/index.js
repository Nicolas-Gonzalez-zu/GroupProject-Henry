import React from 'react';

import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ShoppingCart from '../../frontoffice/navbar/ShoppingCart';
import SupportItem from '../../frontoffice/navbar/SupportItem';
import * as action from '../../../actions/frontoffice/creators';

const NavBar = ({ adm }) => {
  const redirectTo = adm ? '/admin' : '/client';
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    action.logout(dispatch, redirectTo);
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
          <NavLink to={`${redirectTo}`} className="nav-link">
            Home
          </NavLink>
        </li>
        {!adm ? <SupportItem adm={adm} /> : ''}
      </ul>

      <ul className="navbar-nav ml-auto">
        {!adm ? <ShoppingCart /> : ''}
        <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            to="#"
            role="button"
            onClick={logout}
          >
            <span className="m-2">Log out</span>
            <i className="fas fa-door-open" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
