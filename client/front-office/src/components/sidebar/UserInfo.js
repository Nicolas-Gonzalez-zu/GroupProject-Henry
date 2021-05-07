import React from 'react';

import { NavLink } from 'react-router-dom';

const UserInfo = () => (
  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
    <div className="image">
      <img
        src="/dist/img/user2-160x160.jpg"
        className="img-circle elevation-2"
        alt="User profile"
      />
    </div>
    <div className="info">
      <NavLink to="/profile" className="d-block">
        Alexander Pierce
      </NavLink>
    </div>
  </div>
);

export default UserInfo;
