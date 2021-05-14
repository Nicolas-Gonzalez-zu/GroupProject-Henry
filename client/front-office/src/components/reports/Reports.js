import React from 'react';

export default function Reports() {
  return (
    <div>
      <div className="bg-warning d-flex justify-content-between w-100 p-3 rounded-top">
        <h5>Download your movements reports </h5>
      </div>
      <div className="d-flex w-100 justify-content-center p-5">
        <button type="button" className="btn btn-block btn-info btn-xs w-25">
          <h6>Download all movements</h6>
        </button>
      </div>
      <div className="d-flex justify-content-center">Or</div>
      <div className="d-flex justify-content-center p-5">
        <label>Filter by:</label>
        <select name="select">
          <option value="value1" selected disabled>
            None
          </option>
          <option value="value1">Type</option>
          <option value="value2">Date</option>
          <option value="value3">Wallet</option>
        </select>
      </div>
      /api/fo/
    </div>
  );
}
