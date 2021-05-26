import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Pro.css';
import Tilt from 'react-vanilla-tilt';

import * as action from '../../actions/creators';

export default function Pro() {
  const services = useSelector((state) => state.serviceReducer.services);
  const items = useSelector((state) => state.shopReducer.shop);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [state, setstate] = useState(false);
  const [btns, setbtns] = useState(false);
  const FORM_ID = 'payment-form';

  // console.log(services, 'servi');
  const showmodal = () => {
    setstate(!state);
    setbtns(false);
  };

  useEffect(() => {
    action.getServices(dispatch);
  }, [dispatch]);

  const addcarrito = (e) => {
    const filtrado = services.filter((f) => f.name === 'Pro-Accounts');
    console.log(filtrado, 'fil');
    const pro = filtrado.map((s) => {
      console.log(s.price, 'dentrodelmap');
      const data = {
        id: s.id,
        name: s.name,
        description: s.description,
        price: Number(s.price),
      };
      return data;
    });

    // eslint-disable-next-line no-restricted-globals
    Swal.fire({
      title: 'Do you really want to confirm purchase?',
      icon: 'question',
      toast: true,
      position: 'center',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setbtns(true);
        setPaymentMethod('mercado pago');
        const miUuid = uuid();
        const obj = {
          services: pro,
          user: user.user,
          orderId: miUuid,
          payment_method: 'mercado pago',
        };
        action.serverPetition
          .post('http://localhost:3001/api/fo/mp', obj)
          .then((order) => {
            setPreferenceId(order.data.body.id);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    if (paymentMethod && preferenceId) {
      const btn = document.getElementsByClassName('mercadopago-button');
      if (btn.length <= 0) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
        script.setAttribute('data-preference-id', preferenceId);
        const form = document.getElementById(FORM_ID);
        form.appendChild(script);
      }
    }
  }, [paymentMethod, preferenceId]);

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
                  <span className="text-success">✓ </span>Limited Wallets
                </li>
                <li>
                  <span className="text-success">✓ </span>Limited Budgets
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
                <button type="button" className="btn btn-warning mt-5" onClick={showmodal}>
                  <b> Buy Now!</b>
                </button>
              </ul>
            </div>
          </Tilt>
        </div>
        <Modal show={state}>
          <Modal.Header>
            <b>Select your Payment Methods</b>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-around">
              {btns ? (
                <>
                  <button
                    type="button"
                    className="btn  btn-outline-dark"
                    onClick={addcarrito}
                    disabled
                  >
                    <img
                      src="https://help.turitop.com/hc/article_attachments/360013282039/isologoVertical.png"
                      alt="American Express"
                      height="70"
                      width="70"
                    />
                  </button>
                  <button
                    type="button"
                    className="btn  btn-outline-dark"
                    onClick={addcarrito}
                    disabled
                  >
                    <img
                      src="https://i.ibb.co/Wvs4LWh/paypal.png"
                      alt="American Express"
                      height="70"
                      width="70"
                    />
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <button type="button" className="btn  btn-outline-dark" onClick={addcarrito}>
                    <img
                      src="https://help.turitop.com/hc/article_attachments/360013282039/isologoVertical.png"
                      alt="American Express"
                      height="70"
                      width="70"
                    />
                  </button>
                  <button type="button" className="btn  btn-outline-dark" onClick={addcarrito}>
                    <img
                      src="https://i.ibb.co/Wvs4LWh/paypal.png"
                      alt="American Express"
                      height="70"
                      width="70"
                    />
                  </button>
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-start">
              <div className="row no-print">
                <div className="col-12">
                  {preferenceId ? <form id={FORM_ID} method="POST" /> : ''}
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-danger" onClick={showmodal}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
