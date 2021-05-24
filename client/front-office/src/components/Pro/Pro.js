import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './Pro.css';
import Tilt from 'react-vanilla-tilt';

import * as action from '../../actions/creators';

export default function Pro() {
  const items = useSelector((state) => state.shopReducer.shop);
  const dispatch = useDispatch();
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const filter = items.filter((x) => x.name === 'Plan Pro');

  useEffect(() => {
    if (authAlert.fire) {
      const position = authAlert.type === 'success' ? 'center' : 'top-end';

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
        } else {
          action.setAlert(dispatch);
        }
      });
    }
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const agregarShop = () => {
    if (filter.length === 0) {
      const data = {
        id: 1,
        name: 'Plan Pro',
        price: 300,
        description: 'Upgrade to Plan Pro',
      };
      action.addShop(data, dispatch);
    } else {
      Swal.fire({
        title: 'You already added it to the cart',
        icon: 'error',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
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
                <button type="button" className="btn btn-warning mt-5" onClick={agregarShop}>
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
