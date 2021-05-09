/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// -v1

const Profile = () => (
  <div className="card-body box-profile">
    <div className="text-center">
      <img
        className="profile-user-img img-fluid img-circle"
        src="/assets/img/profile-default.png"
        alt="User profile"
      />
    </div>

    <h3 className="profile-username text-center">Nina Mcintire</h3>

    <p className="text-muted text-center">Software Engineer</p>

    <ul className="list-group list-group-unbordered mb-3">
      <li className="list-group-item">
        <b>Plan</b> <a className="float-right">Free</a>
      </li>
      <a href="#" className="btn btn-primary btn-block">
        <b>Upgrade Profile</b>
      </a>
      <li className="list-group-item">
        <b>Email</b> <a className="float-right">nina@gmail.com</a>
      </li>
      <li className="list-group-item">
        <b>Telephone</b> <a className="float-right">1152298571</a>
      </li>
    </ul>
    <a href="/edit" className="btn btn-primary btn-block">
      <b>Change Info</b>
    </a>
  </div>
);

export default Profile;
