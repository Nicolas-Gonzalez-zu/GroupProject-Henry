import React from 'react';
import './Pro.css';
import Tilt from 'react-vanilla-tilt';

export default function Pro() {
  return (
    <>
      <div className="b">
        <div className="d-flex justify-content-center mt-3">
          <h1>
            Choose the perfect <b className="text-warning">Plan</b> for you
          </h1>
        </div>
        <div className="d-flex justify-content-center">
          <Tilt options={{ scale: 4, max: 30 }} className="border border-dark m-3 pb-0">
            <div className="bg-white rounded ">
              <div className="d-flex justify-content-center row">
                <b className="blockquote text-center">Free User</b>
                <p className="text-center">Everything you need to start control your finances</p>
                <p className="mt-4">
                  <b>USD $ 00.00 </b>/ lifetime
                </p>
              </div>
              <hr className="mt-0 bg-dark" />
              <ul className="text-center list-unstyled">
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-danger">✗ </span>
                  <del>Limited reports</del>
                </li>
                <li>
                  <span className="text-danger">✗ </span>
                  <del>Limited reports</del>
                </li>
                <li>
                  <span className="text-danger">✗ </span>
                  <del>Limited reports</del>
                </li>
                <button type="button" className="btn btn-dark mt-5">
                  Get Started
                </button>
              </ul>
            </div>
          </Tilt>
          <Tilt options={{ scale: 4, max: 25 }} className="m-3 border border-warning pb-0">
            <div className="bg-white rounded ">
              <div className="d-flex justify-content-center row">
                <b className="blockquote text-center">👑 Pro User</b>
                <p className="text-center">
                  Professional finance control with unlimited access to premium tools and content
                </p>
                <p>
                  <b>USD $ 300.00 </b>/ year
                </p>
              </div>
              <hr className="mt-0 bg-warning" />
              <ul className="text-center list-unstyled">
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited reports
                </li>
                <button type="button" className="btn btn-warning mt-5">
                  <b> Buy Now!</b>
                </button>
              </ul>
            </div>
          </Tilt>
        </div>
      </div>
    </>
  );
}
