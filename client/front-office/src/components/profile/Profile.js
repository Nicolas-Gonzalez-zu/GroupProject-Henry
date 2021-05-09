import React from 'react';

import { useSelector } from 'react-redux';

const Profile = () => {
  const userData = useSelector((store) => store.loginReducer.sessionData.loggedUser);
  const fileExtension = useSelector((store) => store.editFormReducer.fileExtension);
  console.log(userData);
  return (
    <div className="card-body box-profile">
      <div className="text-center">
        <img
          className="profile-user-img img-fluid img-circle"
          src={`https://d14sc2fsougwhp.cloudfront.net/${userData.user.id}`}
          alt="User profile"
        />
      </div>

      <h3 className="profile-username text-center">
        {userData.user.first_name} {userData.user.last_name}
      </h3>

      <p className="text-muted text-center">Customer</p>

      <ul className="list-group list-group-unbordered mb-3">
        <li className="list-group-item">
          <b>Plan</b> <p className="float-right">{userData.plan.name}</p>
        </li>
        <p className="btn btn-primary btn-block">
          <b>Upgrade Profile</b>
        </p>
        <li className="list-group-item">
          <b>Email</b> <p className="float-right">{userData.user.email}</p>
        </li>
        <li className="list-group-item">
          <b>Telephone</b> <p className="float-right">{userData.user.phone}</p>
        </li>
      </ul>
      <a href="/edit" className="btn btn-primary btn-block">
        <b>Change Info</b>
      </a>
    </div>
  );
};

export default Profile;
