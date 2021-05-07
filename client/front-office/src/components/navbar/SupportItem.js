import React from 'react';

const SupportItem = () => (
  <li className="nav-item dropright">
    <a className="nav-link" data-toggle="dropdown" href="/">
      <span>Soporte</span>
    </a>
    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
      <div className="dropdown-divider" />
      <a className="dropdown-item " href="/">
        Preguntas Frecuentes
      </a>
      <div className="dropdown-divider" />
      <a href="/" className="dropdown-item ">
        Habla con nosotros
      </a>
    </div>
  </li>
);
export default SupportItem;
