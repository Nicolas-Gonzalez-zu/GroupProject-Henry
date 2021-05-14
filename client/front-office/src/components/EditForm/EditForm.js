/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as action from '../../actions/editForm';

const EditForm = () => {
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.authReducers.sessionData.loggedUser);
  const [editProfile, setEditProfile] = useState({
    file: null,
    userInfo: null,
  });

  const [formValid, setFormValid] = useState({
    displayMsg: 'none',
    valid: '',
  });
  const BASE_URL = 'http://localhost:3001/api/';
  const [validatingMail, setvalidatingMail] = useState(false);
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const serverPetition = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': 'localhost:3001',
    },
  });
  const onChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'email') {
      e.target.value = e.target.value.toLowerCase();
      if (regex.test(e.target.value)) {
        setTimeout(() => {
          setvalidatingMail(true);
          serverPetition
            .post('auth/mail-exists', { email: e.target.value, type: 'customer' })
            .then(({ data }) => {
              const { exists } = data;
              if (exists) {
                setFormValid({ ...formValid, valid: 'is-invalid', displayMsg: 'inline' });
                console.log(formValid, ' estoy aca');
                setvalidatingMail(false);
              } else {
                setFormValid({ ...formValid, valid: 'is-valid', displayMsg: 'none' });
                setvalidatingMail(false);
              }
            })
            .catch(() => {
              setFormValid({ ...formValid, valid: 'is-valid', displayMsg: 'none' });
              setvalidatingMail(false);
            });
          console.log('validating...');
        }, 500);
      }
    }
    switch (e.target.name) {
      case 'selectedFile':
        if (e.target.files.length > 0) {
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
          <div className="input-group mb-3 col-7">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <span
              id="exampleInputEmail1-error"
              className="error invalid-feedback col-12"
              style={{
                display: formValid.displayMsg,
              }}
            >
              Email already taken
            </span>
            <input
              onChange={(e) => onChange(e)}
              name="email"
              type="email"
              className={`form-control ${formValid.valid}`}
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className={`fas fa-envelope ${validatingMail ? 'fa-spin' : ''}`} />
              </div>
            </div>
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
