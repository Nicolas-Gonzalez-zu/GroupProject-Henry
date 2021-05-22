import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { setAlert } from '../../actions/creators';

import { forgotPassword } from '../../actions/changePassword';

const ForgotPassword = () => {
  const [formReady, setFormReady] = useState(false);
  const [email, setEmail] = useState({ valid: 'none', value: '' });

  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  const history = useHistory();
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{3,})$/i;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email.value));
  };

  const handleChange = (e) => {
    if (regex.test(e.target.value)) {
      setEmail({ valid: 'is-valid', value: e.target.value });
      setFormReady(true);
    } else {
      setEmail({ valid: 'is-invalid', value: e.target.value });
      setFormReady(false);
    }
  };

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
        setEmail({ valid: 'none', value: '' });
        setFormReady(false);
      });
    }
  }, [authAlert, dispatch]);

  return (
    <div className="card card-outline card-primary mt-4">
      <div className="card-header text-center">
        <h1 className="h1">
          <b>Finance</b>APP
        </h1>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Recover your password</p>

        <form className="container" onSubmit={submitHandler}>
          <div className="row row-cols-2 mb-3">
            <div className="input-group mb-3 col-7">
              <input
                required
                onChange={handleChange}
                type="email"
                className={`form-control ${email.valid}`}
                placeholder="Email"
                name="email"
                value={email.value}
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
        <Link to="#" onClick={history.goBack}>
          Go back
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default ForgotPassword;
