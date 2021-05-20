import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const SideBarMenu = () => {
  const route = useLocation();
  const [movmActive, setMovmActive] = useState(false);
  const [shopmActive, setShopmActive] = useState(false);

  useEffect(() => {
    const movmRoutes = ['/income', '/expense', '/transfer'];
    const shopmRoutes = ['/invoices', '/services'];
    if (movmRoutes.includes(route.pathname)) {
      setMovmActive(true);
    } else {
      setMovmActive(false);
    }
    if (shopmRoutes.includes(route.pathname)) {
      setShopmActive(true);
    } else {
      setShopmActive(false);
    }
  }, [route.pathname]);
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
          <NavLink exact to="/pro" className="nav-link">
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
          <Link
            to="#"
            className={`nav-link ${movmActive ? 'active' : 'collapsed'}`}
            data-toggle="collapse"
            data-target="#collapseExample2"
          >
            <i className="nav-icon fas fa-hand-holding-usd" />
            <p>
              Movements
              <i className="right fas fa-angle-down" />
            </p>
          </Link>
          <ul
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            id="collapseExample2"
            className={`collapse nav nav-treeview ${movmActive ? 'show' : ''}`}
          >
            <li className="nav-item">
              <NavLink to="/income" className="nav-link">
                <i className="nav-icon fas fa-file-invoice" />
                Incomes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/expense" className="nav-link">
                <i className="nav-icon fas fa-file-invoice" />
                Expenses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/transfer" className="nav-link">
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
          <Link
            to="#"
            className={`nav-link ${shopmActive ? 'active' : 'collapsed'}`}
            data-toggle="collapse"
            data-target="#shopMenu"
          >
            <i className="nav-icon fas fa-shopping-cart" />
            <p>
              Shop
              <i className="right fas fa-angle-down" />
            </p>
          </Link>
          <ul
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            id="shopMenu"
            className={`collapse nav nav-treeview ${shopmActive ? 'show' : ''}`}
          >
            <li className="nav-item">
              <NavLink to="/invoices" className="nav-link">
                <i className="nav-icon fas fa-file-invoice" />
                Invoices
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services" className="nav-link">
                <i className="nav-icon fas fa-box" />
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
