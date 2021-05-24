import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import * as action from '../../../actions/creators';

export default function Services() {
  const items = useSelector((state) => state.shopReducer.shop);
  const services = useSelector((state) => state.serviceReducer.services);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  const agregarShop = (id, name, description, price) => {
    const filter = items.filter((x) => x.id === id);
    if (filter.length === 0) {
      const data = {
        id,
        name,
        description,
        price,
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

  useEffect(() => {
    if (authAlert.fire) {
      const position = authAlert.type === 'success' ? 'center' : 'top-end';

      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position,
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        if (authAlert.type === 'success') {
          action.setAlert(dispatch);
        } else {
          action.setAlert(dispatch);
        }
      });
    }
    action.getServices(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  return (
    <>
      <div className="card-header bg-dark">
        <div className="d-flex justify-content-between row">
          <h3>Services</h3>
        </div>
      </div>
      <div className="card-body pb-0">
        <div className="row">
          {services &&
            services.map((x) => (
              <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                <div className="card bg-light d-flex flex-fill">
                  <div className="ribbon-wrapper">
                    <div className="ribbon bg-warning">-% 20 Pro</div>
                  </div>
                  <div className="card-header text-muted border-bottom-0">  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="col-7">
                        <h2 className="lead">
                          <b>{x.name}</b>
                        </h2>
                        <p className="text-muted text-sm">
                          <b>About: </b> {x.description}
                        </p>
                        <ul className="ml-4 mb-0 fa-ul text-muted">
                          <li className="medium">
                            <span className="fa-li">
                              <i className="fas fa-dollar-sign" />
                            </span>
                            {x.price}
                          </li>
                          <li className="medium">
                            <span className="fa-li">
                              <i className="fas fa-file-signature" />
                            </span>
                            {x.categories.map((z) => (
                              <span>• {z.name} </span>
                            ))}
                            •
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 text-center">
                        <img
                          src="../../dist/img/user1-128x128.jpg"
                          alt="user-avatar"
                          className="img-circle img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="text-right">
                      <Button
                        className="btn btn-sm bg-dark border-0"
                        onClick={() => {
                          agregarShop(x.id, x.name, x.description, x.price);
                        }}
                      >
                        <i className="fas fa-shopping-cart" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
