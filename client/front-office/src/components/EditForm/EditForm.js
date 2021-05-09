/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const EditForm = () => (
  <div>
    <div className="card-header">
      <h3 className="card-title">Change Info</h3>
    </div>
    <form>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputTel">Telephone</label>
          <input
            type="telephone"
            className="form-control"
            id="exampleInputTel"
            placeholder="Enter telephone"
          />
        </div>
        <a href="/changePassword" className="btn btn-primary">
          <b>Change Password</b>
        </a>
        <div className="form-group">
          <label htmlFor="exampleInputFile">File input</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="exampleInputFile" />
              <label className="custom-file-label" htmlFor="exampleInputFile">
                Choose file
              </label>
            </div>
            <div className="input-group-append">
              <span className="input-group-text">Upload</span>
            </div>
          </div>
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

export default EditForm;
