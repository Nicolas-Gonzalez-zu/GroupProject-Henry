import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Particles from 'react-particles-js';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import '../../assets/particles/particles.css';
import parti from '../../assets/particles/particlesjs-config.json';

import * as action from '../../actions/creators';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionData = useSelector((store) => store.authReducers.sessionData);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = (values) => {
    setIsSubmitting(true);
    action.doLogin(values, dispatch);
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body');
    body[0].classList.remove('sidebar-mini');
    body[0].classList.add('login-page');
    body[0].classList.add('hold-transition');
    if (authAlert.fire) {
      if (authAlert.message !== 'Not logged in') {
        Swal.fire({
          title: authAlert.message,
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
        }).then(() => {
          action.setAlert(dispatch, '', false);
        });
        setIsSubmitting(false);
      }
    }
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
        history.push('/');
      });
    }
    return () => {
      // const body = document.getElementsByTagName('body');
      body[0].classList.remove('login-page');
      body[0].classList.remove('hold-transition');
      body[0].classList.add('sidebar-mini');
      action.redirect(dispatch);
      action.setAlert(dispatch);
    };
  }, [sessionData, dispatch, history, authAlert.fire, authAlert.message]);

  return (
    <div>
      <div className="login-box" id="login" style={{ minHeight: 466 }}>
        <div className="card login-card">
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
            <p className="login-box-msg">Sign in to start your session</p>
            <Formik
              initialValues={{ email: '', password: '' }}
              validateOnMount
              onSubmit={submitHandler}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required('required'),
                password: Yup.string().required('required'),
              })}
            >
              {(props) => {
                const {
                  dirty,
                  isValid,
                  handleBlur,
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className={`form-control 
                        ${errors.email && touched.email ? 'is-invalid' : ''}
                        ${!errors.email && touched.email ? 'is-valid' : ''}
                        ${values.email !== '' && !errors.email ? 'is-valid' : ''}
                        ${values.email !== '' && errors.email ? 'is-invalid' : ''}
                        ${values.email !== '' && dirty && errors.email ? 'is-invalid' : ''}
                        `}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Email"
                        value={values.email}
                        required
                        autoComplete="off"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope" />
                        </div>
                      </div>
                      <span id="exampleInputEmail1-error" className="error invalid-feedback">
                        {errors.email}
                      </span>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className={`form-control 
                        ${errors.password && touched.password ? 'is-invalid' : ''}
                        ${!errors.password && touched.password ? 'is-valid' : ''}
                        ${values.password !== '' && !errors.password ? 'is-valid' : ''}
                        ${values.password !== '' && errors.password ? 'is-invalid' : ''}
                        ${values.password !== '' && dirty && errors.password ? 'is-invalid' : ''}
                        `}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        value={values.password}
                        autoComplete="off"
                      />

                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>

                      <span id="exampleInputEmail1-error" className="error invalid-feedback">
                        {errors.password}
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-8">
                        <div className="icheck-primary">
                          <label htmlFor="remember">
                            <input type="checkbox" id="remember" />
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="col-4">
                        <button
                          disabled={!isValid}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
            <div className="social-auth-links text-center mt-2 mb-3">
              <Link to="/login" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </Link>
              <Link to="/login" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </Link>
            </div>

            <p className="mb-1">
              <Link to="/forgot">Forgot password?</Link>
            </p>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Sign up
              </Link>
            </p>
            <div className="d-flex flex-row-reverse">
              <Link to="/about">
                <button type="button" className="btn btn-warning">
                  <img
                    src="https://i.ibb.co/XS4mQ0f/logopng.png"
                    alt="user-avatar"
                    className="img-circle img-fluid mr-2"
                    width="30"
                  />
                  <b>About Us</b>
                </button>
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
export default Login;
