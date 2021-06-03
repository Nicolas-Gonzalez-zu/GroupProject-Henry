import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Pro.css';
import Tilt from 'react-vanilla-tilt';
import Paypal from '../Paypal/Paypal';

import * as action from '../../../actions/frontoffice/creators';

export default function Pro() {
  const services = useSelector((state) => state.serviceReducer.services);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [state, setstate] = useState(false);
  const [btns, setbtns] = useState(false);
  const [toPaypal, setToPaypal] = useState({});
  const FORM_ID = 'payment-form';

  // console.log(services, 'servi');
  const showmodal = () => {
    setstate(!state);
    setbtns(false);
    setPaymentMethod(null);
  };

  useEffect(() => {
    action.getServices(dispatch);
  }, [dispatch]);

  const addcarrito = (payment) => {
    const filtrado = services.filter((f) => f.name === 'E-conomy Pro Account');
    console.log(filtrado, 'fil');
    const pro = filtrado.map((s) => {
      const data = {
        id: s.id,
        name: s.name,
        description: s.description,
        price: Number(s.price),
      };
      return data;
    });
    console.log(filtrado, 'pat');
    // eslint-disable-next-line no-restricted-globals
    Swal.fire({
      title: 'Do you really want to confirm purchase?',
      icon: 'question',
      toast: true,
      position: 'center',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed && payment === 'mercadopago') {
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
      } else if (res.isConfirmed && payment === 'paypal') {
        setbtns(true);

        const itemPaypal = filtrado.map((i) => ({
          name: i.name,
          description: i.description,
          unit_amount: {
            currency_code: 'USD',
            value: i.price,
          },
          quantity: '1',
          sku: i.id,
        }));
        setToPaypal(itemPaypal);
        setPaymentMethod('paypal');
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
    if (paymentMethod === 'paypal' && preferenceId) {
      setPreferenceId(null);
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
                  <span className="text-success">✓ </span>
                  Full use of the website
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Control your finances
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Three Wallets per user
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Three Budgets per user
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Reports per month
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Buy diferents Services
                </li>

                <li>
                  <span className="text-danger">✗ </span>

                  <del>Unlimeted reports</del>
                </li>
                <li>
                  <span className="text-danger">✗ </span> <del>20% Discount in shop services</del>
                </li>
                <li>
                  <span className="text-danger">✗ </span>
                  <del>Priority when buying a service</del>
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
                  <span className="text-success">✓ </span>
                  Full use of the website
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Control your finances
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Ten Wallets per user
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Ten Budgets per user
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Reports per year
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Buy diferents Services
                </li>

                <li>
                  <span className="text-success">✓ </span>
                  Unlimeted reports with filters
                </li>
                <li>
                  <span className="text-success">✓ </span> 20% Discount in shop services
                </li>
                <li>
                  <span className="text-success">✓ </span>
                  Priority when buying a service
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
                  <button type="button" className="btn  btn-outline-dark" disabled>
                    <img
                      src="https://help.turitop.com/hc/article_attachments/360013282039/isologoVertical.png"
                      alt="mercadopago"
                      height="70"
                      width="70"
                    />
                  </button>
                  <button type="button" className="btn  btn-outline-dark" disabled>
                    <img
                      src="https://i.ibb.co/Wvs4LWh/paypal.png"
                      alt="paypal"
                      height="70"
                      width="70"
                    />
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <button
                    type="button"
                    className="btn  btn-outline-dark"
                    onClick={() => addcarrito('mercadopago')}
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
                    onClick={() => addcarrito('paypal')}
                  >
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
                  {paymentMethod === 'paypal' ? <Paypal items={toPaypal} /> : ''}
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
