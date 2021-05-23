import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import ModalCart from './ModalCart';

const Cart = () => {
  const items = useSelector((state) => state.shopReducer.shop);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const toastMixin = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const submitPayment = (e) => {
    e.preventDefault();
    if (items.length) {
      Swal.fire({
        text: 'Quieres realizar la compra ? ',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
      })
        .then((response) => {
          console.log(response, 'soy el response');
          if (response.isConfirmed) {
            localStorage.clear();
            toastMixin
              .fire({
                title: 'Compra realizada con exito',
                icon: 'success',
              })
              .then(() => {
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            toastMixin
              .fire({
                title: 'Compra cancelada',
                icon: 'error',
              })
              .then(() => {
                setShowModal(!showModal);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toastMixin
        .fire({
          title: 'Parece que tu carrito esta vacio...',
          icon: 'warning',
        })
        .then(() => {
          setShowModal(!showModal);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeFromShop = (id) => {
    action.removeFromShop(id, dispatch);
  };

  const subtotal = items.reduce((acc, b) => acc + parseInt(b.price, 10), 0);

  const discount = user.plan.name === 'Pro' ? (subtotal * 20) / 100 : 0;
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
  console.log(date, 'date');
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
                  <tr>
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
          <div className="d-flex justify-content-around">
            <img
              src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
              alt="American Express"
              height="100"
              width="100"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg"
              alt="Paypal"
              height="100"
              width="100"
            />
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

      <div className="d-flex flex-row-reverse">
        <ModalCart
          showModal={showModal}
          setShowModal={setShowModal}
          submitPayment={submitPayment}
        />
      </div>
    </div>
  );
};

export default Cart;
