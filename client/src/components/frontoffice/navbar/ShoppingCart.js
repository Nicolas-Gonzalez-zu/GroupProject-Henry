import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const items = useSelector((state) => state.shopReducer.shop);
  const total = items.reduce((acc, b) => acc + parseInt(b.price, 10), 0);
  return (
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="/">
        <i className="fas fa-shopping-cart" />
        <span className="badge badge-info navbar-badge">{items.length}</span>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <span className="dropdown-item dropdown-header">Cart ({items.length})</span>
        <div className="dropdown-divider" />
        <span className="dropdown-item font-weight-bold">
          Total <span className="float-right">${total}</span>
        </span>
        <div className="dropdown-divider" />
        <Link to="/client/cart" className="dropdown-item dropdown-footer">
          See Detail Cart
        </Link>
      </div>
    </li>
  );
};

export default ShoppingCart;
