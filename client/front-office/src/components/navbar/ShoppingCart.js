import React from 'react';
import ServiceCard from './ServiceCard';

const fakeServices = [
  { name: 'balance anual', price: 2000 },
  { name: 'facturación', price: 1200 },
  { name: 'consulta', price: 1000 },
];
const ShoppingCart = () => (
  <li className="nav-item dropdown">
    <a className="nav-link" data-toggle="dropdown" href="/">
      <i className="fas fa-shopping-cart" />
      <span className="badge badge-danger navbar-badge">404</span>
    </a>
    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
      <span className="dropdown-item dropdown-header">Cart ({fakeServices.length})</span>
      <div className="dropdown-divider" />
      {fakeServices &&
        fakeServices.map((s, i) => (
          <ServiceCard key={`sv-${s.name}`} name={s.name} price={s.price} />
        ))}
      <div className="dropdown-divider" />
      <span className="dropdown-item font-weight-bold">
        Total <span className="float-right">$3200</span>
      </span>
      <div className="dropdown-divider" />
      <a href="/" className="dropdown-item dropdown-footer">
        See Detail Cart
      </a>
    </div>
  </li>
);

export default ShoppingCart;
