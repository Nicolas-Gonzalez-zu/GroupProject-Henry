import React from 'react';

import UserInfo from './UserInfo';
import SearchBar from './SearchBar';
import SideBarMenu from './SideBarMenu';

const SideBarContent = () => (
  <div className="sidebar">
    <UserInfo />
    {/* <SearchBar /> */}
    <SideBarMenu />
  </div>
);

export default SideBarContent;
