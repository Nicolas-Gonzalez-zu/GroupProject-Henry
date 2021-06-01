import React from 'react';

const ServiceCard = ({ name, price }) => (
  <a href="/" className="dropdown-item">
    <i className="	fas fa-file-invoice" /> {name}
    <span className="float-right text-muted text-sm">$ {price}</span>
  </a>
);
export default ServiceCard;
