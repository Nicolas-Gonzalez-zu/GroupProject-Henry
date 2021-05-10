import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as action from '../../actions/creators';

const Register = () => {
  const fieldsDef = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const [fields, setFields] = useState(fieldsDef);
  const [formValid, setValidation] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: {
      password: '',
      confirm_password: '',
      displayMsg: 'none',
    },
  });
  const [formReady, setformReady] = useState(false);
  const loggedIn = useSelector((state) => state.authReducers.loggedIn);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      e.target.value = e.target.value.toLowerCase();
    }
    const newFields = { ...fields, [e.target.name]: e.target.value };
    setFields(newFields);
    setValidation(
      validateForm(e.target, formValid, newFields.password, newFields.confirm_password),
    );
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('sidebar-mini');
    body[0].classList.add('register-page');
    if (loggedIn) {
      action.redirect(dispatch, '/');
    }
    return () => {
      action.redirect(dispatch, false);
      body[0].classList.remove('register-page');
      body[0].classList.add('sidebar-mini');
    };
  });

  useEffect(() => {
    setformReady(enableRegister(formValid));
  }, [formValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    action.doRegister(fields, dispatch);
  };

  return (
    <div className="card card-outline card-primary">
      <div className="card-header text-center">
        <h1 className="h1">
          <b>Finance</b>APP
        </h1>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Register a new membership</p>

        <form className="container" onSubmit={submitHandler}>
          <div className="row row-cols-2 mb-3">
            <div className="input-group mb-3 col">
              <input
                required
                onChange={handleChange}
                type="text"
                className={`form-control ${formValid.first_name}`}
                placeholder="First name"
                name="first_name"
                value={fields.first_name}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3 col">
              <input
                required
                onChange={handleChange}
                type="text"
                className={`form-control ${formValid.last_name}`}
                placeholder="Last name"
                name="last_name"
                value={fields.last_name}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 mb-3">
            <div className="input-group mb-3 col-5">
              <input
                required
                onChange={handleChange}
                type="text"
                className={`form-control ${formValid.phone}`}
                placeholder="Phone"
                name="phone"
                value={fields.phone}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-phone" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3 col-7">
              <input
                required
                onChange={handleChange}
                type="email"
                className={`form-control ${formValid.email}`}
                placeholder="Email"
                name="email"
                value={fields.email}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 mb-3">
            <div className="input-group mb-3 col">
              <input
                required
                onChange={handleChange}
                type="password"
                className={`form-control ${formValid.password.password}`}
                placeholder="Password"
                name="password"
                value={fields.password}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3 col">
              <input
                required
                onChange={handleChange}
                type="password"
                className={`form-control ${formValid.password.confirm_password}`}
                placeholder="Retype password"
                name="confirm_password"
                value={fields.confirm_password}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <span
              id="exampleInputEmail1-error"
              className="error invalid-feedback col-12"
              style={{
                display: formValid.password.displayMsg,
              }}
            >
              password and Password confirmation does not match
            </span>
          </div>

          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                Wen registering I agree to the <a href="/">terms</a>
              </div>
            </div>
            <div className="col-4">
              <button disabled={!formReady} type="submit" className="btn btn-success btn-block">
                Register
              </button>
            </div>
          </div>
        </form>
        <hr />
        <div className="d-flex flex-row justify-content-around align-items-center mb-3">
          <a href="/" className="btn btn-primary">
            <i className="fab fa-facebook mr-2" />
            Sign up using Facebook
          </a>
          <a href="/" className="btn btn-danger">
            <i className="fab fa-google-plus mr-2" />
            Sign up using Google+
          </a>
        </div>
        <div className="d-flex flex-row justify-content-around align-items-center mb-3">
          <a href="/" className="text-center">
            I already have a membership
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;

const validateForm = ({ name, value }, formValid, passwordValue, confirmPassword) => {
  let valid;
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  switch (name) {
    case 'first_name':
      valid = value !== '' && value.length > 3 ? 'is-valid' : 'is-invalid';
      break;
    case 'last_name':
      valid = value !== '' && value.length > 3 ? 'is-valid' : 'is-invalid';
      break;
    case 'phone':
      valid = value.length > 5 ? 'is-valid' : 'is-invalid';
      break;
    case 'email':
      valid = regex.test(value) ? 'is-valid' : 'is-invalid';
      break;
    case 'password':
      valid = value.length > 5 ? 'is-valid' : 'is-invalid';
      break;
    case 'confirm_password':
      valid = value.length > 5 && passwordValue === confirmPassword ? 'is-valid' : 'is-invalid';
      break;
    default:
      valid = '';
  }
  if (name === 'password' || name === 'confirm_password') {
    const password = { ...formValid.password, [name]: valid };
    if (passwordValue !== confirmPassword) {
      password.displayMsg = 'block';
      password.confirm_password = 'is-invalid';
    } else {
      password.displayMsg = 'none';
      password.confirm_password = 'is-valid';
    }
    return { ...formValid, password };
  }
  return { ...formValid, [name]: valid };
};

const enableRegister = (fieldsValues) =>
  fieldsValues.first_name === 'is-valid' &&
  fieldsValues.last_name === 'is-valid' &&
  fieldsValues.phone === 'is-valid' &&
  fieldsValues.email === 'is-valid' &&
  fieldsValues.password.password === 'is-valid' &&
  fieldsValues.password.confirm_password === 'is-valid';
