/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as action from '../../actions/editForm';

const EditForm = () => {
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.authReducers.sessionData.loggedUser);
  const [editProfile, setEditProfile] = useState({
    file: null,
    userInfo: { id: userData.user.id },
  });
  console.log(userData);
  useEffect(() => {
    console.log(editProfile);
  }, [editProfile]);

  const onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        if (e.target.files.length > 0) {
          console.log(e.target.files[0]);
          console.log(userData);
          const file = e.target.files[0];
          const blob = file.slice(0, file.size, file.type);
          const newFile = new File([blob], userData.user.id, { type: file.type });

          setEditProfile({ ...editProfile, file: newFile });
        }
        break;
      default:
        setEditProfile({
          ...editProfile,
          userInfo: { ...editProfile.userInfo, [e.target.name]: e.target.value },
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editProfile.file) {
      dispatch(action.fileExtension(editProfile.file.type));
      const fd = new FormData();
      fd.append('file', editProfile.file, userData.user.id);

      dispatch(action.editUser(fd, editProfile.userInfo));
    }
    dispatch(action.editUser(null, editProfile.userInfo));
  };
  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Change Info</h3>
      </div>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => onChange(e)}
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputTel">Phone</label>
            <input
              onChange={(e) => onChange(e)}
              name="phone"
              type="number"
              className="form-control"
              id="exampleInputTel"
              placeholder="Enter phone"
            />
          </div>
          <Link to="/changePassword" className="btn btn-primary">
            <b>Change Password</b>
          </Link>
          <div className="form-group">
            <label htmlFor="exampleInputFile">Avatar photo</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  name="selectedFile"
                  onChange={(e) => onChange(e)}
                  type="file"
                  className="custom-file-input"
                  id="exampleInputFile"
                />
                <label className="custom-file-label" htmlFor="exampleInputFile">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
