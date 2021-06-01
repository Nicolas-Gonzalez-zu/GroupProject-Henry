import React from 'react';

import UserInfo from './UserInfo';
import SideBarMenu from './SideBarMenu';

const SideBarContent = ({ adm, menu }) => (
  <div className="sidebar">
    <UserInfo adm={adm} />
    <SideBarMenu menu={menu} adm={adm} />
  </div>
);

export default SideBarContent;
