import React from 'react';
import { Link } from 'react-router-dom';

const SideBarLogo = ({ adm }) => {
  const redirectTo = adm ? '/admin' : '/client';
  return (
    <Link to={redirectTo} className="brand-link">
      <img
        src="https://i.ibb.co/XS4mQ0f/logopng.png"
        alt="user-avatar"
        className="img-circle img-fluid"
        width="55"
      />
      <span className="brand-text font-weight-light txt">e-conomy</span>
    </Link>
  );
};
export default SideBarLogo;
