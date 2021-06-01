import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import imgDefault from '../../assets/img/profile-default.png';

const UserInfo = () => {
  const user = useSelector((store) => store.authReducers.sessionData.loggedUser);

  const onError = (e) => {
    e.target.src = imgDefault;
  };
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={user.profile}
          onError={onError}
          className="img-circle elevation-2"
          alt="User profile"
        />
      </div>
      <div className="info">
        <NavLink to="/profile" className="d-block">
          {user ? user.first_name : 'not login info'} {user ? user.last_name : 'not login info'}
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
