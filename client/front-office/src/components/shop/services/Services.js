import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as action from '../../../actions/creators';

export default function Services() {
  const services = useSelector((state) => state.serviceReducer.services);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getServices(dispatch);
  }, [dispatch]);

  return (
    <>
      <div className="card-header bg-teal">
        <div className="d-flex justify-content-between row">
          <h3>Services</h3>
          <Button>
            <i className="fas fa-shopping-cart" />
            <span className="badge badge-warning navbar-badge">3</span>
          </Button>
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
                      <a href="#" className="btn btn-sm bg-teal">
                        <i className="fas fa-shopping-cart" /> Add to Cart
                      </a>
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
