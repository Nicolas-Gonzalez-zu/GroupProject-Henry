import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import imgDefault from '../../assets/img/profile-default.png';

const Profile = () => {
  const user = useSelector((store) => store.authReducers.sessionData.loggedUser);

  const onError = (e) => {
    e.target.src = imgDefault;
  };

  return (
    <div className="card-body box-profile">
      <div className="text-center">
        <img
          className="profile-user-img img-fluid img-circle"
          src={user.profile}
          onError={onError}
          alt="User profile"
        />
      </div>

      <h3 className="profile-username text-center">
        {user ? user.first_name : ''}
        {user ? user.last_name : ''}
      </h3>

      <p className="text-muted text-center">Customer</p>

      <ul className="list-group list-group-unbordered mb-3">
        <li className="list-group-item">
          <b>Plan</b> <p className="float-right">{user ? user.plan.name : ''}</p>
        </li>
        <li className="list-group-item">
          <b>Email</b> <p className="float-right">{user ? user.email : ''}</p>
        </li>
        <li className="list-group-item">
          <b>Telephone</b> <p className="float-right">{user ? user.phone : ''}</p>
        </li>
      </ul>
      <Link to="/edit" className="btn btn-primary btn-block">
        <b>Change Info</b>
      </Link>
    </div>
  );
};

export default Profile;
