import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBarMenu = ({ adm, menu }) => {
  const route = useLocation();
  const acl = useSelector((state) => state.authReducers.sessionData.loggedUser.acl);
  const [ActiveMenu, setActiveMenu] = useState({
    shopmActive: false,
    movmActive: false,
  });
  useEffect(() => {
    const movmRoutes = ['income', 'expense', 'transfer'];
    const shopmRoutes = ['invoices', 'services'];
    const path = route.pathname.split('/')[route.pathname.split('/').length - 1];
    if (movmRoutes.includes(path)) {
      setActiveMenu((A) => ({ ...A, movmActive: true }));
    } else {
      setActiveMenu((A) => ({ ...A, movmActive: false }));
    }
    if (shopmRoutes.includes(path)) {
      setActiveMenu((A) => ({ ...A, shopmActive: true }));
    } else {
      setActiveMenu((A) => ({ ...A, shopmActive: false }));
    }
  }, [route.pathname]);

  const buildedMenu = menu
    .filter((mn) => filterHelper(mn, acl, adm))
    .map((m) => {
      if (!m.tree) {
        return (
          <li className="nav-item" key={`li-no-tree-elem-${m.path}`}>
            <NavLink
              exact
              to={`/${m.nameSpace}/${m.path}`}
              className="nav-link"
              key={`nl-no-tree-elem-${m.path}`}
            >
              <i className={`nav-icon fas fa-${m.icon}`} />
              <p>{m.title}</p>
              {m.promoLabel && m.PromoLabelVariant ? (
                <span className={`right badge badge-${m.PromoLabelVariant}`}>{m.promoLabel}</span>
              ) : (
                ''
              )}
            </NavLink>
          </li>
        );
      }
      return (
        <li className="nav-item" key={`li-elem-branch-${m.activeStateName}`}>
          <a
            href="#"
            type="button"
            className={`nav-link ${ActiveMenu[m.activeStateName] ? 'active' : 'collapsed'}`}
            data-toggle="collapse"
            data-target={`#menu${m.title}`}
            key={`a-tree-elem-${m.activeStateName}`}
          >
            <i className={`nav-icon fas fa-${m.icon}`} />
            <p>
              {m.title}
              <i className="right fas fa-angle-down" />
            </p>
          </a>
          <ul
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            id={`menu${m.title}`}
            className={`collapse nav nav-treeview ${ActiveMenu[m.activeStateName] ? 'show' : ''}`}
          >
            {m.tree.map((branch) => (
              <li className="nav-item" key={`li-elem-branch-${branch.path}`}>
                <NavLink
                  to={`/${m.nameSpace}/${branch.path}`}
                  className="nav-link"
                  key={`nl-elem-branch-${branch.path}`}
                >
                  <i className={`nav-icon fas fa-${branch.icon}`} />
                  {branch.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      );
    });

  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        {buildedMenu}
      </ul>
    </nav>
  );
};
export default SideBarMenu;

const filterHelper = (menu, acl, adm) => {
  if (!adm) {
    return true;
  }
  return (
    acl.includes(menu.requiredPermission) ||
    acl.includes('ALL_PERMISSIONS') ||
    menu.requiredPermission === '*'
  );
};
