import React from 'react';
import './Emptypage.css';

export default function Emptypage({ name }) {
  return (
    <div className="card">
      <div className="card-body d-flex justify-content-center align-items-center">
        <img src="https://i.ibb.co/HDfLJCm/emptypage.jpg" />
        <h5 className="text-center">
          <h3 className="txt">
            <b className="text-warning">Opps!</b> Your {name} are Empty !!
          </h3>
          <br />
          {name === 'Reports' ? (
            <label className="text-info txt"> Download a new one! </label>
          ) : (
            <label className="text-info txt"> Create a new one! </label>
          )}
        </h5>
      </div>
    </div>
  );
}
