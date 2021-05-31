import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { setAlert } from '../../actions/creators';

import { resetPassword } from '../../actions/changePassword';

const ResetPassword = ({ id, token }) => {
  const history = useHistory();
  const [formReady, setFormReady] = useState(false);
  const [password, setPassword] = useState({ value1: '', value2: '' });
  const [formValid, setFormValid] = useState({
    displayMsg: 'none',
    valid: '',
    validationDisplayMsg: 'none',
  });
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        password1: password.value1,
        password2: password.value2,
        id,
        token,
      }),
    );
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'password1':
        setPassword({ ...password, value1: e.target.value });
        break;

      case 'password2':
        setPassword({ ...password, value2: e.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (password.value1 && password.value2) {
      if (password.value1 === password.value2) {
        setFormValid({ ...formValid, displayMsg: 'none' });
        if (regex.test(password.value1)) {
          setFormValid({ ...formValid, displayMsg: 'none', valid: 'is-valid' });
          setFormReady(true);
        } else if (!regex.test(password.value1)) {
          setFormReady(false);
          setFormValid({
            ...formValid,
            displayMsg: 'none',
            validationDisplayMsg: 'block',
            valid: 'is-invalid',
          });
        }
      } else {
        setFormReady(false);
        setFormValid({
          ...formValid,
          displayMsg: 'block',
          valid: 'is-invalid',
          validationDisplayMsg: 'none',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

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
        setPassword({ valid: 'none', value1: '', value2: '' });
        setFormReady(false);
        history.push('/login');
      });
    }
  }, [authAlert, dispatch, history]);

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="card card-outline card-primary mt-4">
          <div className="card-header text-center">
            <div className="h1">
              <img
                src="https://i.ibb.co/XS4mQ0f/logopng.png"
                alt="user-avatar"
                className="img-circle img-fluid mr-2"
                width="55"
              />
              <b className="txt text-warning">e</b>-conomy
            </div>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Recover your password</p>
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
            <form className="container" onSubmit={submitHandler}>
              <div className="row row-cols-2 mb-3">
                <div className="input-group mb-3 col-7">
                  <input
                    required
                    onChange={handleChange}
                    type="password"
                    className={`form-control ${formValid.valid}`}
                    placeholder="Password"
                    name="password1"
                    value={password.value1}
                    autoComplete="off"
                  />
                </div>
                <div className="input-group mb-3 col-7">
                  <input
                    required
                    onChange={handleChange}
                    type="password"
                    className={`form-control ${formValid.valid}`}
                    placeholder="Repeat password"
                    name="password2"
                    value={password.value2}
                    autoComplete="off"
                  />
                </div>
                <div className="col-4">
                  <button disabled={!formReady} type="submit" className="btn btn-success btn-block">
                    Send
                  </button>
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
