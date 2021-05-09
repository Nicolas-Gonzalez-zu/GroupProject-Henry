import React, { useState, useEffect } from 'react';
// import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import WalletModal from './WalletModal';
import WalletsTable from './WalletsTable';
import Chart from './Chart';
import * as action from '../../actions/creators';

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  // const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState({
    name: '',
    balance: null,
  });

  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getWallet(dispatch);
  }, [dispatch]);

  const balances = wallets.filter((w) => w.status === true);
  const total = balances.reduce((acc, b) => acc + parseInt(b.balance, 10), 0);

  const setWalletsHandler = (e) => {
    if (!wallet.name || !wallet.balance) {
      return alert('You need to fill both inputs');
    }
    if (typeof wallet.name === 'number' || /[a-zA-Z]+/g.test(wallet.balance)) {
      console.log(typeof wallet.name, typeof wallet.balance);
      return alert("Please set the values corretly, f.e: name:'cash', balance: 1300");
    }
    // setWallets([...wallets, wallet]);
    setWallet({ name: '', balance: null });
    action.addWallet(wallet, dispatch);
    setShowModal(!showModal);
    return alert('wallet added!');
  };

  const setWalletHandler = (e) => {
    setWallet({ ...wallet, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex p-3 flex-column">
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
      <div className="d-flex flex-column justify-content-around">
        <div className="align-self-center" style={{ width: '40%' }}>
          <div className="card card-info">
            <div className="card-header d-flex justify-content-between">
              <h3 className="card-title align-self-center mr-auto">Wallets</h3>
              <div className="card-tools d-flex ">
                <WalletModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  wallet={wallet}
                  setWalletHandler={setWalletHandler}
                  setWalletsHandler={setWalletsHandler}
                />
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
        <div className="align-self-center" style={{ width: '15%' }}>
          <Chart array={wallets} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
