import React from 'react';

const SideBarMenu = () => (
  <nav className="mt-2">
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li className="nav-item">
        <a href="../widgets.html" className="nav-link">
          <i className="fas fa-wallet" />
          <p>
              Monedero
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
           <i className="fas fa-file-powerpoint" />
          <p>
              Presupuesto
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
          <i className="fas fa-hand-holding-usd" />
          <p>
              Movimientos
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
          <i className="fas fa-chart-line" />
          <p>
               Informes
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
          <i className="fas fa-shopping-cart" />
          <p>
              Tienda
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
           <i className="fas fa-file-invoice-dollar" />
          <p>
               Mis servicios
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
        <a href="../widgets.html" className="nav-link">
           <i className="fas fa-chess-knight" />
          <p>
              Mi cuenta PRO
            <span className="right badge badge-danger">New</span>
          </p>
        </a>
      </li>
    </ul>
  </nav>
);

export default SideBarMenu;
