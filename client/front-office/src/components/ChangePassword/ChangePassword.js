/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const ChangePassword = () => (
  <div>
    <div className="card-header">
      <h3 className="card-title">Change Password</h3>
    </div>
    <form>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Actual Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Actual Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword2">New Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="New Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword3">Repeat New Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword3"
            placeholder="Repeat New Password"
          />
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

export default ChangePassword;
