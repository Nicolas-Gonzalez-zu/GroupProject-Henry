import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormDefault from '../FormDefault/FormDefault';

const ModalCart = ({ showModal, setShowModal, submitPayment }) => {
  const [method, setMethod] = useState('');
  const setModalHandler = () => {
    setMethod('');
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setMethod(e.target.value);
    console.log(method);
    console.log(method);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!method) {
      Swal.fire({
        title: 'Please,choose one payment method before continue',
        icon: 'error',
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
    } else {
      submitPayment(e);
    }
  };
  return (
    <div>
      <Button className="btn btn-success" onClick={setModalHandler}>
        Submit payment
      </Button>
      <Modal show={showModal}>
        <Modal.Header>
          <h2>Choose your payment method</h2>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitHandler}>
            <div className="d-flex flex-column align-items-center">
              <div>
                <img
                  src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg"
                  alt="Paypal"
                  height="70"
                  width="70"
                />
                <label className="m-2">Paypal</label>
                <input type="radio" name="method" value="paypal" onChange={handleChange} />
              </div>
              <div>
                <img
                  src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
                  alt="American Express"
                  height="70"
                  width="70"
                />
                <label className="m-2">Mercado pago</label>
                <input type="radio" name="method" onChange={handleChange} value="mercado pago" />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" className="btn btn-success mr-4">
                Buy
              </Button>
              <Button onClick={setModalHandler} className="btn btn-danger">
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ModalCart;
