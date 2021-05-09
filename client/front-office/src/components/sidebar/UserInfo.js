import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import imgDefault from '../../assets/img/profile-default.png';

const UserInfo = () => {
  const userData = useSelector((store) => store.authReducers.sessionData.loggedUser);

  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={
            userData.user ? `https://d14sc2fsougwhp.cloudfront.net/${userData.user.id}` : imgDefault
          }
          className="img-circle elevation-2"
          alt="User profile"
        />
      </div>
      <div className="info">
        <NavLink to="/profile" className="d-block">
          {userData.user ? userData.user.first_name : 'not login info'}{' '}
          {userData.user ? userData.user.last_name : 'not login info'}
        </NavLink>
      </div>
    </div>
  );
};

export default UserInfo;
