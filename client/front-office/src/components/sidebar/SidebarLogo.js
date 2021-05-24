import React from 'react';
import { Link } from 'react-router-dom';

const SideBarLogo = () => (
  <Link to="/" className="brand-link">
    <i className="fas fa-cat brand-image img-circle fa-2x" style={{ opacity: '.8' }} />
    <span className="brand-text font-weight-light">Finance APP</span>
  </Link>
);
export default SideBarLogo;
