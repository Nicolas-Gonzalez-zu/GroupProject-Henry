// import React, { useEffect } from 'react';
import React from 'react';

// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

// import { Link, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import imgDefault from '../../assets/img/profile-default.png';
// import * as action from '../../actions/creators';

const Profile = () => {
  // const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducers.sessionData.loggedUser);
  // const loggedIn = useSelector((store) => store.authReducers.sessionData.loggedIn);
  // const redirect = useSelector((store) => store.authReducers.redirect);
  const img = userData.user
    ? `https://d14sc2fsougwhp.cloudfront.net/${userData.user.id}`
    : imgDefault;
  //
  // useEffect(() => {
  //   if (!loggedIn) {
  //     action.redirect(dispatch, '/login');
  //   }
  //   return () => {
  //     action.redirect(dispatch, false);
  //   };
  // });

  return (
    <div className="card-body box-profile">
      <div className="text-center">
        <img className="profile-user-img img-fluid img-circle" src={img} alt="User profile" />
      </div>

      <h3 className="profile-username text-center">
        {userData.user ? userData.user.first_name : ''}
        {userData.user ? userData.user.last_name : ''}
      </h3>

      <p className="text-muted text-center">Customer</p>

      <ul className="list-group list-group-unbordered mb-3">
        <li className="list-group-item">
          <b>Plan</b> <p className="float-right">{userData.user ? userData.plan.name : ''}</p>
        </li>
        <p className="btn btn-primary btn-block">
          <b>Upgrade Profile</b>
        </p>
        <li className="list-group-item">
          <b>Email</b> <p className="float-right">{userData.user ? userData.user.email : ''}</p>
        </li>
        <li className="list-group-item">
          <b>Telephone</b> <p className="float-right">{userData.user ? userData.user.phone : ''}</p>
        </li>
      </ul>
      <Link to="/edit" className="btn btn-primary btn-block">
        <b>Change Info</b>
      </Link>
    </div>
  );
};

export default Profile;
