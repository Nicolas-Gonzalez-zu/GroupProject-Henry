import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as action from '../../actions/creators';

const FORM_ID = 'payment-form';

const Cart = () => {
  const items = useSelector((state) => state.shopReducer.shop);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  const handleChange = (e) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Do you really want to confirm purchase');

    if (confirmed) {
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
    } else {
      e.target.checked = false;
    }
  };
  useEffect(() => {
    if (paymentMethod && preferenceId) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [paymentMethod, preferenceId]);

  const removeFromShop = (id) => {
    action.removeFromShop(id, dispatch);
  };

  const subtotal = items.reduce((acc, b) => acc + parseInt(b.price, 10), 0);

  const discount = user.plan.name === 'Pro' ? (subtotal * 20) / 100 : 0;
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  return (
    <div className="invoice p-3 mb-3">
      <div className="row">
        <div className="col-6">
          <h4>
            <i className="fas fa-file-invoice-dollar mr-2" />
            E-conomy invoice
          </h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <div className="d-flex flex-column  align-items-center justify-content-around">
            <img
              className=" img-circle"
              src={user.profile}
              alt="User profile"
              height="35"
              width="35"
            />
            <h6 className="mb-0">
              {user.user.first_name} {user.user.last_name}
            </h6>

            <div>
              <h6 className="mb-0">{user.user.email}</h6>
            </div>
            <div>
              <h6>Plan: {user.plan.name}</h6>
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
        <div className="col-4">
          <p className="lead">Payment Methods:</p>
          <div className="d-flex justify-content-around align-items-center">
            <img
              src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
              alt="American Express"
              height="70"
              width="70"
            />
            <input type="radio" onChange={handleChange} value="mercado pago" />
          </div>
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

                {user.plan.name === 'Pro' ? (
                  <tr>
                    <th>Off 20%!</th>
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
                <tr>
                  <th>Total:</th>
                  <td>$ {subtotal - discount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row no-print">
        <div className="col-12">{preferenceId ? <form id={FORM_ID} method="POST" /> : ''}</div>
      </div>
    </div>
  );
};

export default Cart;
