import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const userData = useSelector((store) => store.loginReducer.sessionData.loggedUser);
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={`https://d14sc2fsougwhp.cloudfront.net/${userData.user.id}`}
          className="img-circle elevation-2"
          alt="User profile"
        />
      </div>
      <div className="info">
        <NavLink to="/profile" className="d-block">
          {userData.user.first_name} {userData.user.last_name}
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
