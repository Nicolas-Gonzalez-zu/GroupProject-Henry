/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import axios from 'axios';
import { setAlert } from '../../../actions/frontoffice/creators';
import * as action from '../../../actions/frontoffice/editForm';

const EditForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducers.sessionData.loggedUser);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
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
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const serverPetition = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': 'localhost:3001',
    },
  });

  useEffect(() => {
    if (authAlert.fire) {
      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setAlert(dispatch);
        setEditProfile({ ...editProfile, userInfo: null });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAlert, dispatch]);

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
          const newFile = new File([blob], user.id, { type: file.type });
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
      fd.append('file', editProfile.file, user.id);

      dispatch(action.editUser(fd, editProfile.userInfo));
    }
    dispatch(action.editUser(null, editProfile.userInfo));
  };

  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="d-flex justify-content-center b">
      <div
        className="card mt-2 col-4 border border-warning d-flex align-self-center"
        style={{ height: 'auto' }}
      >
        <div className="card-header">
          <div className="d-flex">
            <div>
              <button type="button" className="btn " onClick={goBack}>
                <h4>
                  <i className="fas fa-arrow-circle-left text-dark" />
                </h4>
              </button>
            </div>
            <div className=" pl-4 mt-2">
              <h4>Change Info</h4>
            </div>
          </div>
        </div>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="card-body">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <div className="input-group pb-3">
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
                placeholder={user.email}
                className={`form-control ${formValid.valid} `}
                id="exampleInputEmail1"
                value={editProfile.userInfo ? editProfile.userInfo.email : ''}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className={`fas fa-envelope ${validatingMail ? 'fa-spin' : ''}`} />
                </div>
              </div>
            </div>
            <label htmlFor="exampleInputTel">Phone</label>
            <div className="input-group pb-3">
              <input
                onChange={(e) => onChange(e)}
                name="phone"
                type="number"
                placeholder={user.phone}
                className="form-control"
                id="exampleInputTel"
                value={editProfile.userInfo ? editProfile.userInfo.phone : ''}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-phone" />
                </div>
              </div>
            </div>

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
          <div className="card-footer d-flex justify-content-center">
            <button type="submit" className="btn btn-sm btn-warning">
              <b>Save Changes</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
