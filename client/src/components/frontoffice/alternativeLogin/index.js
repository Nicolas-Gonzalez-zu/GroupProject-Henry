import { React, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../actions/frontoffice/creators';

const AlternativeLogin = () => {
  const history = useHistory();
  const [fields, setFields] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const sessionData = useSelector((store) => store.authReducers.sessionData);

  const handleChange = (e) => {
    const newFields = { ...fields, [e.target.name]: e.target.value };
    setFields(newFields);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    action.doLogin(fields, dispatch);
  };

  useEffect(() => {
    if (sessionData.loggedIn) {
      history.push('/');
    }
  }, [sessionData, dispatch, history]);

  return (
    <>
      <div className="login-page" style={{ minHeight: 466 }}>
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <div className="h1">
                <b>Finance</b>App
              </div>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <form onSubmit={submitHandler}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Email"
                    value={fields.email}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Password"
                    value={fields.password}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
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
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>

              <div className="social-auth-links text-center mt-2 mb-3">
                <Link to="/login" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                </Link>
                <Link to="/login" className="btn btn-block btn-danger">
                  <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                </Link>
              </div>

              <p className="mb-1">
                <Link to="/login">I forgot my password</Link>
              </p>
              <p className="mb-0">
                <Link to="/register" className="text-center">
                  Register a new membership
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AlternativeLogin;
