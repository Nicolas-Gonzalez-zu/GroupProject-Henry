/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setAlert } from '../../actions/creators';
import action from '../../actions/changePassword';

const ChangePassword = () => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const dispatch = useDispatch();
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const [editPassword, setEditPassword] = useState({
    actualPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const [formReady, setformReady] = useState(false);
  const [formValid, setFormValid] = useState({
    displayMsg: 'none',
    valid: '',
    validationDisplayMsg: 'none',
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
        setEditPassword({
          actualPassword: '',
          newPassword: '',
          newPassword2: '',
        });
        setFormValid({ displayMsg: 'none', valid: '' });
      });
    }
  }, [authAlert, dispatch]);

  useEffect(() => {
    if (editPassword.actualPassword && editPassword.newPassword && editPassword.newPassword2) {
      if (editPassword.newPassword === editPassword.newPassword2) {
        setFormValid({ ...formValid, displayMsg: 'none' });
        if (regex.test(editPassword.newPassword)) {
          setFormValid({ ...formValid, displayMsg: 'none', valid: 'is-valid' });
          setformReady(true);
        } else if (!regex.test(editPassword.newPassword)) {
          setformReady(false);
          setFormValid({
            ...formValid,
            displayMsg: 'none',
            validationDisplayMsg: 'block',
            valid: 'is-invalid',
          });
        }
      } else {
        setformReady(false);
        setFormValid({
          ...formValid,
          displayMsg: 'block',
          valid: 'is-invalid',
          validationDisplayMsg: 'none',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPassword]);

  const onChange = (e) => {
    switch (e.target.name) {
      case 'actualPassword':
        setEditPassword({
          ...editPassword,
          actualPassword: e.target.value,
        });
        break;

      case 'newPassword':
        setEditPassword({
          ...editPassword,
          newPassword: e.target.value,
        });
        break;

      case 'newPassword2':
        setEditPassword({
          ...editPassword,
          newPassword2: e.target.value,
        });
        break;

      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(editPassword));
  };

  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Change Password</h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className="card-body">
          <span
            id="exampleInputEmail1-error"
            className="error invalid-feedback col-12"
            style={{
              display: formValid.displayMsg,
            }}
          >
            *password and Password confirmation does not match
          </span>
          <span
            id="exampleInputEmail1-error"
            className="error invalid-feedback col-12"
            style={{
              display: formValid.validationDisplayMsg,
            }}
          >
            *At least 1 number, 1 lower case, 1 upper case. Use at least 8 character in your
            password
          </span>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Actual Password</label>
            <input
              onChange={(e) => onChange(e)}
              value={editPassword.actualPassword}
              name="actualPassword"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Actual Password"
            />
            <p className="forgot-password text-left">
              <NavLink to="/forgot">Forgot password?</NavLink>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">New Password</label>
            <input
              onChange={(e) => onChange(e)}
              value={editPassword.newPassword}
              name="newPassword"
              type="password"
              className={`form-control ${formValid.valid}`}
              id="exampleInputPassword2"
              placeholder="New Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword3">Repeat New Password</label>
            <input
              onChange={(e) => onChange(e)}
              value={editPassword.newPassword2}
              name="newPassword2"
              type="password"
              className={`form-control ${formValid.valid}`}
              id="exampleInputPassword3"
              placeholder="Repeat New Password"
            />
          </div>
        </div>
        <div className="card-footer">
          <button disabled={!formReady} type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
