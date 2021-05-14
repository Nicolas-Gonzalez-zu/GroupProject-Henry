import React from 'react';

export default function Transfer() {
  return (
    <div className="card card-danger">
      <div className="card-header">
        <h3 className="card-title">Different Width</h3>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-3">
              <b>Wallet</b>
              <input type="text" className="form-control" placeholder="Wallet..." />
            </div>
            <div className="col-4">
              <b>Hola</b>
              <input type="text" className="form-control" placeholder="Wallet..." />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
