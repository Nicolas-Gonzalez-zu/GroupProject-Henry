import dotenv from 'dotenv';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Particles from 'react-particles-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/particles/particles.css';
import parti from '../../assets/particles/particlesjs-config.json';
import * as action from '../../actions/creators';

const regex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
dotenv.config();

const BASE_URL = 'http://localhost:3001/api/';
const serverPetition = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_BACKEND_URL || 'localhost:3001',
  },
});

const Register = () => {
  const history = useHistory();
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
    email: {
      value: '',
      message: 'none',
    },
    password: {
      password: '',
      confirm_password: '',
      displayMsg: 'none',
      validationDisplayMsg: 'none',
    },
  });
  const [formReady, setformReady] = useState(false);
  const sessionData = useSelector((store) => store.authReducers.sessionData);
  const redirect = useSelector((store) => store.authReducers.redirect);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validatingMail, setvalidatingMail] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
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
                const email = {
                  value: 'is-invalid',
                  message: 'inline',
                };
                setValidation({ ...formValid, email });
                setvalidatingMail(false);
              } else {
                const email = {
                  value: 'is-valid',
                  message: 'none',
                };
                setValidation({ ...formValid, email });
                setvalidatingMail(false);
              }
            })
            .catch(() => {
              const email = {
                value: 'is-valid',
                message: 'none',
              };
              setValidation({ ...formValid, email });
              setvalidatingMail(false);
            });
        }, 500);
      }
    }
    const newFields = { ...fields, [e.target.name]: e.target.value };
    setFields(newFields);
    setValidation(
      validateForm(e.target, formValid, newFields.password, newFields.confirm_password),
    );
  };

  useEffect(() => {
    if (sessionData.loggedIn) {
      setIsSubmitting(true);
      Swal.fire({
        title: 'You are logged in, redirecting...',
        icon: 'success',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        action.setAlert(dispatch);
        history.push('/');
      });
    }

    setformReady(enableRegister(formValid));
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('sidebar-mini');
    body[0].classList.add('register-page');

    if (authAlert.fire) {
      const position = authAlert.type === 'success' ? 'center' : 'top-end';
      if (authAlert.type === 'error') {
        setIsSubmitting(false);
      }
      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        if (authAlert.type === 'success') {
          action.setAlert(dispatch);
          history.push('/login');
        } else {
          action.setAlert(dispatch);
        }
      });
    }
  }, [
    authAlert.fire,
    authAlert.message,
    authAlert.type,
    dispatch,
    formValid,
    history,
    redirect,
    sessionData.loggedIn,
  ]);

  const submitHandler = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    serverPetition
      .post('auth/register', fields)
      .then(({ data: response }) => {
        if (response.success) {
          action.setAlert(dispatch, 'Registration successful, redirecting...', true, 'success');
        }
      })
      .catch((err) => {
        action.setError(err, dispatch);
      });
  };

  return (
    <div>
      <div className="login-box" id="login" style={{ minHeight: 466 }}>
        <div className="card logincard">
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
                      <span className="fas fa-phone " />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3 col-7">
                  <input
                    required
                    onChange={handleChange}
                    type="email"
                    className={`form-control ${formValid.email.value}`}
                    placeholder="Email"
                    name="email"
                    value={fields.email.value}
                    autoComplete="off"
                    disabled={validatingMail}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className={`fas fa-envelope ${validatingMail ? 'fa-spin' : ''}`} />
                    </div>
                  </div>
                </div>
                <span
                  id="exampleInputEmail1-error"
                  className="error invalid-feedback col-12"
                  style={{
                    display: formValid.email.message,
                  }}
                >
                  Email already taken
                </span>
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
                  *password and Password confirmation does not match.
                </span>
                <span
                  id="exampleInputEmail1-error"
                  className="error invalid-feedback col-12"
                  style={{
                    display: formValid.password.validationDisplayMsg,
                  }}
                >
                  *At least 1 number, 1 lower case, 1 upper case. Use at least 8 character in your
                  password
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
              <Link to="/login" className="btn btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </Link>
              <Link to="/login" className="btn btn-danger">
                <i className="fab fa-google-plus mr-2" />
                Sign up using Google+
              </Link>
            </div>
            <div className="d-flex flex-row justify-content-around align-items-center mb-3">
              <Link to="/login" className="text-center">
                I already have a membership
              </Link>
            </div>
          </div>
          <div className={`overlay dark ${!isSubmitting ? 'd-none' : ''}`}>
            <i className={`fas fa-3x fa-sync-alt fa-spin ${authAlert.fire ? 'd-none' : ''}`} />
          </div>
        </div>
      </div>
      <Particles id="particles-js" params={parti} />
    </div>
  );
};

export default Register;

const validateForm = ({ name, value }, formValid, passwordValue, confirmPassword) => {
  let valid;

  const regexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

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
      valid = regexp.test(value) ? 'is-valid' : 'is-invalid';
      break;
    case 'password':
      valid = regexPassword.test(value) ? 'is-valid' : 'is-invalid';
      break;
    case 'confirm_password':
      valid =
        regexPassword.test(value) && passwordValue === confirmPassword ? 'is-valid' : 'is-invalid';
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
      console.log(regexPassword.test(value));
      if (regexPassword.test(value)) {
        password.displayMsg = 'none';
        password.validationDisplayMsg = 'none';
        password.confirm_password = 'is-valid';
      } else {
        password.displayMsg = 'none';
        password.validationDisplayMsg = 'block';
        password.confirm_password = 'is-invalid';
      }
    }
    return { ...formValid, password };
  }
  if (name === 'email') {
    const email = {
      value: valid,
      message: 'none',
    };
    return { ...formValid, email };
  }
  return { ...formValid, [name]: valid };
};

const enableRegister = (fieldsValues) =>
  fieldsValues.first_name === 'is-valid' &&
  fieldsValues.last_name === 'is-valid' &&
  fieldsValues.phone === 'is-valid' &&
  fieldsValues.email.value === 'is-valid' &&
  fieldsValues.password.password === 'is-valid' &&
  fieldsValues.password.confirm_password === 'is-valid';
