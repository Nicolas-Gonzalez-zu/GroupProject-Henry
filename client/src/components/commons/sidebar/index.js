import React from 'react';

import SideBarLogo from './SidebarLogo';
import SideBarContent from './SidebarContent';

const SideBar = ({ adm, menu }) => (
  <aside className="main-sidebar sidebar-dark-navy bg-navy elevation-4">
    <SideBarLogo adm={adm} />
    <SideBarContent menu={menu} adm={adm} />
  </aside>
);

export default SideBar;
