import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WalletModal from './WalletModal';
import WalletsTable from './WalletsTable';
import Chart from './Chart';
import * as action from '../../actions/creators';
import InternalLoader from '../loaders/InternalLoader';
import EmptyPage from '../FormDefault/Emptypage';

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
    <div className="d-flex flex-column jusitfy-content-around mx-3 mt-3">
      <div className="card">
        {!loading && <InternalLoader />}
        {wallets.length === 0 ? (
          ''
        ) : (
          <>
            <div className="card card-header bg-navy">
              <h3>Wallet info</h3>
            </div>
            <div className="d-flex justify-content-around ">
              <div className="col-5 col-lg-3 mt-5">
                <div className="small-box bg-warning mt-4 ">
                  <div className="inner">
                    <h4>Total balance</h4>
                    <h5 className="font-weight-bold">$ {total}.00</h5>
                  </div>
                  <div className="icon">
                    <i className="fas fa-wallet " />
                  </div>
                </div>
              </div>
              <div>
                <Chart array={wallets} />
              </div>
            </div>
          </>
        )}
        {loading && (
          <>
            <div className="card-header bg-navy d-flex justify-content-between">
              <h3 className="card-title align-self-center mr-auto">Wallets</h3>
              <div className="card-tools d-flex ">
                <WalletModal />
                {/* <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                ></button> */}
              </div>
            </div>
            {wallets.length === 0 ? (
              <EmptyPage name="Wallets" />
            ) : (
              <WalletsTable wallets={wallets} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
