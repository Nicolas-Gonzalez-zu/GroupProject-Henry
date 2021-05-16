import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WalletModal from './WalletModal';
import WalletsTable from './WalletsTable';
import Chart from './Chart';
import * as action from '../../actions/creators';
import InternalLoader from '../loaders/InternalLoader';

const Wallet = () => {
  const [loading, setLoading] = useState(true);

  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getWallet(dispatch);
    reset();
  }, [dispatch]);

  const balances = wallets.filter((w) => w.status === true);
  const total = balances.reduce((acc, b) => acc + parseInt(b.balance, 10), 0);

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  return (
    <div className="d-flex p-3 flex-column">
      {!loading && <InternalLoader />}
      <div className="card card-info h-25 d-inline-block">
        <div className="card card-header">
          <h3>Wallet info</h3>
        </div>
        <div className="d-flex justify-content-around p-3">
          <div className="w-50 p-3 d-flex">
            <div className="small-box bg-success p-3 align-self-center" style={{ width: '60%' }}>
              <div className="inner">
                <h4>Total balance</h4>
                <h5 className="font-weight-bold">${total}</h5>
              </div>
              <div className="icon">
                <i className="fas fa-wallet " />
              </div>
            </div>
          </div>
          <div style={{ width: '30%' }}>
            <Chart array={wallets} />
          </div>
        </div>
      </div>

      <div className="d-flex flex-column">
        <div className="align-self-center w-100">
          <div className="card card-info">
            <div className="card-header d-flex justify-content-between">
              <h3 className="card-title align-self-center mr-auto">Wallets</h3>
              <div className="card-tools d-flex ">
                <WalletModal />
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <WalletsTable wallets={wallets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
