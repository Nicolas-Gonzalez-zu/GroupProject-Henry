import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import imgDefault from '../../../assets/img/png/profile-default.png';

const Profile = () => {
  const user = useSelector((store) => store.authReducers.sessionData.loggedUser);
  const onError = (e) => {
    e.target.src = imgDefault;
  };
  console.log(user);
  return (
    <div className="d-flex justify-content-center b">
      <div
        className="card mt-2 col-4 border border-warning d-flex align-self-center"
        style={{ height: 'auto' }}
      >
        <div className="card-body box-profile ">
          <div className="text-center mb-4">
            <img
              className="profile-user-img img-fluid img-circle border border-warning"
              src={user.profile}
              onError={onError}
              alt="User profile"
            />
          </div>

          <h3 className="profile-username text-center">
            {user ? user.first_name : ''} {user ? user.last_name : ''}
          </h3>

          <p className="text-muted text-center">{user.plan ? user.plan.name : user.rol.name}</p>

          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item ">
              <b>{user.rol ? 'Rol' : 'Plan'}</b>
              <p className="float-right">{user.plan ? user.plan.name : user.rol.name}</p>
            </li>
            <li className="list-group-item ">
              <b>Email</b> <p className="float-right">{user ? user.email : ''}</p>
            </li>
            <li className="list-group-item ">
              <b>Telephone</b> <p className="float-right">{user ? user.phone : ''}</p>
            </li>
          </ul>
          <div className="d-flex justify-content-around">
            <Link to="profile/edit" className="btn btn-sm btn-warning">
              <b>Change Info</b>
            </Link>
            <Link to="profile/changePassword" className="btn btn-sm bg-navy">
              <b>Change Password</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
