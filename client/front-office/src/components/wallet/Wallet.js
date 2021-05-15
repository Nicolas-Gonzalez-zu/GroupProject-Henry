import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WalletModal from './WalletModal';
import WalletsTable from './WalletsTable';
import WalletModalMsj from './WalletModalMsj';
import Chart from './Chart';
import * as action from '../../actions/creators';
import InternalLoader from '../loaders/InternalLoader';

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  // const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState({
    name: '',
    balance: null,
  });
  const [error, setError] = useState({});
  const [errors, setErrors] = useState(false);
  const [showModalMsj, setShowModalMsj] = useState(false);
  const [loading, setLoading] = useState(true);

  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getWallet(dispatch);
    reset();
  }, [dispatch]);

  useEffect(() => {
    if (!wallet.name) {
      setError({ ...error, name: 'the name is required!' });
    } else if (!/^[a-zA-Z\s]+$/g.test(wallet.name)) {
      setError({ ...error, name: 'this field only accepts letters!' });
    } else if (!wallet.balance) {
      setError({ ...error, balance: 'the balance is required!' });
    } else if (!/^[0-9]*$/gm.test(wallet.balance)) {
      setError({ ...error, balance: 'this field only accepts numbers!' });
    }
  }, [wallet]);

  const balances = wallets.filter((w) => w.status === true);
  const total = balances.reduce((acc, b) => acc + parseInt(b.balance, 10), 0);

  const setWalletsHandler = (e) => {
    if (error.name.length > 0 || error.balance.length > 0) {
      setErrors(true);
      return SetModalMsjHandler();
    }
    setErrors(false);
    setWallet({ name: '', balance: null });
    action.addWallet(wallet, dispatch);
    return SetModalMsjHandler();
  };

  const SetModalMsjHandler = () => {
    if (error.name.length > 0 || error.balance.length > 0) {
      setShowModalMsj(!showModalMsj);
    } else {
      setShowModalMsj(!showModalMsj);
      setShowModal(!showModal);
    }
  };

  const setWalletHandler = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  return (
    <div className="d-flex p-3 flex-column">
      {!loading && <InternalLoader />}
      <div className="d-flex justify-content-center">
        <div className="small-box bg-success pb-3" style={{ width: '40%' }}>
          <div className="inner">
            <h4>Total balance</h4>
            <h5 className="font-weight-bold">${total}</h5>
          </div>
          <div className="icon">
            <i className="fas fa-wallet " />
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <Chart array={wallets} />
      </div>
      <div className="d-flex flex-column justify-content-around ">
        <div className="align-self-center" style={{ width: '70%' }}>
          <div className="card card-info">
            <div className="card-header d-flex justify-content-between">
              <h3 className="card-title align-self-center mr-auto">Wallets</h3>
              <div className="card-tools d-flex ">
                {showModalMsj ? (
                  <WalletModalMsj
                    showModalMsj={showModalMsj}
                    setModalMsjHandler={SetModalMsjHandler}
                    errors={errors}
                  />
                ) : (
                  <WalletModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    wallet={wallet}
                    setWalletHandler={setWalletHandler}
                    setWalletsHandler={setWalletsHandler}
                    error={error}
                  />
                )}

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
              <WalletsTable wallets={wallets} errors={errors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
