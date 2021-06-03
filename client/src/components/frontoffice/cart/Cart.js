import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import * as action from '../../../actions/frontoffice/creators';
import imgDefault from '../../../assets/img/png/profile-default.png';
import Paypal from '../Paypal/Paypal';

const FORM_ID = 'payment-form';

const Cart = () => {
  const items = useSelector((state) => state.shopReducer.shop);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [toPaypal, setToPaypal] = useState({});

  const handleChange = (e) => {
    // eslint-disable-next-line no-restricted-globals
    // const confirmed = confirm('Do you really want to confirm purchase');
    Swal.fire({
      title: 'Do you really want to confirm purchase?',
      icon: 'question',
      position: 'center',
      showConfirmButton: true,
      showCancelButton: true,
    })
      .then((response) => {
        if (response.isConfirmed) {
          if (items.length >= 1) {
            if (response.isConfirmed && e.target.value === 'mercado pago') {
              setPaymentMethod(e.target.value);
              const miUuid = uuid();
              const obj = {
                services: items,
                user: user.user,
                orderId: miUuid,
                payment_method: e.target.value,
              };
              action.serverPetition
                .post('http://localhost:3001/api/fo/mp', obj)
                .then((order) => {
                  setPreferenceId(order.data.body.id);
                })
                .catch((err) => {
                  e.target.checked = false;
                  console.log(err);
                });
            } else if (response.isConfirmed && e.target.value === 'paypal') {
              const itemPaypal = items.map((i) => ({
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
              setPaymentMethod(e.target.value);
            }
          } else {
            Swal.fire({
              title: 'Sorry, it seems that your cart is empty, please, try again',
              icon: 'error',
              toast: true,
              position: 'top-right',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            })
              .then(() => {
                e.target.checked = false;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else {
          e.target.checked = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (paymentMethod === 'mercado pago' && preferenceId) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'mpbtn';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
    if (paymentMethod === 'paypal' && preferenceId) {
      setPreferenceId(null);
    }
  }, [paymentMethod, preferenceId]);

  const removeFromShop = (id) => {
    action.removeFromShop(id, user.id, dispatch);
    setPaymentMethod('null');
    /* eslint-disable no-param-reassign */
    document.querySelectorAll('[name=method]').forEach((x) => {
      x.checked = false;
    });
  };

  const onError = (e) => {
    e.target.src = imgDefault;
  };
  const subtotal = items.reduce((acc, b) => acc + parseInt(b.price, 10), 0);
  const discount = user.plan && user.plan.name === 'Pro' ? (subtotal * 20) / 100 : 0;
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  return (
    <div className="invoice p-3 mb-3">
      <div className="card-header bg-navy">
        <div className="row">
          <div className="col-6">
            <h4>
              <img
                src="https://i.ibb.co/XS4mQ0f/logopng.png"
                alt="user-avatar"
                className="img-circle img-fluid"
                width="55"
              />
              <span className="brand-text font-weight-light txt">e-conomy invoice</span>
            </h4>
          </div>
          <div className="col-6 d-flex justify-content-end ">
            <div className="d-flex align-items-center">
              <img
                className=" img-circle"
                src={user.profile}
                alt="user profile"
                height="30"
                width="30"
                onError={onError}
              />
              <div className="d-flex flex-column ml-2">
                <h6 className="mb-0">
                  {user.user && user.user.first_name} {user.user && user.user.first_name}
                </h6>
                <h6 className="mb-0">{user.user && user.user.email}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Product</th>
                <th>Description</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.slice(0, 10).map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.description}</td>
                    <td>$ {i.price}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeFromShop(i.id)}
                        className="btn mt-0 bg-dark"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div
          className={
            items.length >= 1 ? 'col-4' : 'col-4 d-flex align-items-center justify-content-center'
          }
        >
          {items.length >= 1 ? (
            <>
              <p className="lead">Payment Methods:</p>
              <div className="d-flex justify-content-around align-items-center">
                <img
                  src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
                  alt="American Express"
                  height="70"
                  width="70"
                />
                <input type="radio" onChange={handleChange} name="method" value="mercado pago" />
              </div>
              <div className="d-flex justify-content-around align-items-center">
                <img
                  src="https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-4.png"
                  alt="Paypal"
                  height="18"
                  width="70"
                />

                <input type="radio" onChange={handleChange} name="method" value="paypal" />
              </div>{' '}
            </>
          ) : (
            <div className="text-secondary">
              <h4>Empty cart</h4>
              <div className="d-flex justify-content-center">
                <i className="fas fa-cart-arrow-down" width="200" />
              </div>
            </div>
          )}
        </div>

        <div className="col-8">
          <p className="lead">Amount Due {date}</p>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th style={{ width: '50%' }}>Subtotal:</th>
                  <td>$ {subtotal}</td>
                </tr>

                {user.plan && user.plan.name === 'Pro' ? (
                  <tr>
                    <th>
                      <b className="text-success">Off 20%</b>
                    </th>
                    <td>$ {discount}</td>
                  </tr>
                ) : (
                  <tr>
                    <th>
                      <del>Off 20%</del>
                      <h6>
                        <b className="text-warning">Pro account 20% off now!</b>
                      </h6>
                    </th>
                    <td> $ {discount}</td>
                  </tr>
                )}
                {user.plan && user.plan.name === 'Pro' ? (
                  <tr>
                    <th>Total:</th>
                    <td>
                      <del>
                        <p className="m-0 text-secondary">
                          <small>$ {subtotal}</small>
                        </p>
                      </del>
                      <h5>$ {subtotal - discount}</h5>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <th>Total:</th>
                    <td>$ {subtotal}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row no-print">
        <div className="col-2">
          {preferenceId ? <form id={FORM_ID} method="POST" /> : ''}
          {paymentMethod === 'paypal' ? <Paypal items={toPaypal} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Cart;
