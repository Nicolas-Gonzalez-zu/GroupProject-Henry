import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

const Cart = () => {
  const items = useSelector((state) => state.shopReducer.shop);

  const dispatch = useDispatch();
  console.log(items);

  const agregarShop = (data) => {
    action.addShop(data, dispatch);
  };

  const toastMixin = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const submitPayment = () => {
    if (items.length) {
      Swal.fire({
        text: 'Quieres realizar la compra ? ',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
      }).then((response) => {
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
            });
        } else {
          toastMixin.fire({
            title: 'Compra cancelada',
            icon: 'error',
          });
        }
      });
    } else {
      toastMixin.fire({
        title: 'Parece que tu carrito esta vacio...',
        icon: 'warning',
      });
    }
  };

  const removeFromShop = (id) => {
    action.removeFromShop(id, dispatch);
  };

  const data = {
    id: 1,
    name: 'mi servicio',
    price: 1250.5,
    description: '',
    img_url: '', // imagen de persona
    category: {
      id: 1,
      name: 'nombre de categoria',
    },
  };
  const total = items.reduce((acc, b) => acc + parseInt(b.price, 10), 0);

  // agregarShop(data);
  console.log(items, 'dsp de shop');

  return (
    <div className="invoice p-3 mb-3">
      <div className="row">
        <div className="col-12">
          <h4>
            <i className="fas fa-file-invoice-dollar" /> E-conomy inovice
            <small className="float-right">Date: 2/10/2014</small>
          </h4>
        </div>
      </div>
      <div className="row invoice-info">
        <div className="col-sm-4 invoice-col">
          <b>Invoice #007612</b>
          <br />
          <br />
          <b>Order ID:</b> 4F3S8J
          <br />
          <b>Payment Due:</b> 2/22/2014
          <br />
          <b>Account:</b> 968-34567
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
              </tr>
            </thead>
            <tbody>
              {items &&
                items.slice(0, 10).map((i) => (
                  <tr>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.description}</td>
                    <td>{i.price}</td>
                    <button type="button" onClick={() => removeFromShop(i.id)}>
                      <i className="fas fa-trash" />
                    </button>
                  </tr>
                ))}
              <button type="button" onClick={() => agregarShop(data)}>
                agregar
              </button>
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
          <p className="lead">Amount Due 2/22/2014</p>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th style={{ width: '50%' }}>Subtotal:</th>
                  <td>$250.30</td>
                </tr>
                <tr>
                  <th>Tax (9.3%)</th>
                  <td>$10.34</td>
                </tr>
                <tr>
                  <th>Shipping:</th>
                  <td>$5.80</td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>$ {total}.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row no-print">
        <div className="col-12">
          <button type="button" onClick={submitPayment} className="btn btn-success float-right">
            <i className="far fa-credit-card" /> Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
