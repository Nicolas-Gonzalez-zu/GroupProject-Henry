/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import action from '../../actions/changePassword';

const ChangePassword = () => {
  const dispatch = useDispatch();

  const [editPassword, setEditPassword] = useState({
    actualPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const [formReady, setformReady] = useState(false);
  const [formValid, setFormValid] = useState({
    displayMsg: 'none',
    valid: '',
  });

  useEffect(() => {
    if (editPassword.actualPassword && editPassword.newPassword && editPassword.newPassword2) {
      if (editPassword.newPassword === editPassword.newPassword2) {
        setformReady(!formReady);
        setFormValid({ ...formValid, displayMsg: 'none', valid: 'is-valid' });
      } else {
        setformReady(false);
        setFormValid({ ...formValid, displayMsg: 'block', valid: 'is-invalid' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPassword]);

  console.log(editPassword);
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
