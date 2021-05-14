import React from 'react';

export default function Transfer() {
  return (
    <div className="card card-danger">
      <div className="card-header">
        <h3 className="card-title">Transfer money between wallets</h3>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <h4 className=" mr-3 ml-2"> From </h4>
            <div className="col-3">
              <input type="text" className="form-control" placeholder="Wallet..." />
            </div>
            <h4 className=" mr-3 ml-2"> To </h4>
            <div className="col-4">
              <input type="text" className="form-control" placeholder="Wallet..." />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
