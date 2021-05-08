import React, { useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
import WalletModal from './WalletModal';
import WalletsTable from './WalletsTable';
import Chart from './Chart';

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState({
    name: '',
    amount: null,
  });

  const total = wallets.reduce((acc, value) => acc + parseInt(value.amount, 10), 0);

  const setWalletsHandler = (e) => {
    setWallets([...wallets, wallet]);
    setWallet({ name: '', amount: null });
    setShowModal(!showModal);
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
      <div className="d-flex flex-row justify-content-around">
        <div style={{ width: '60%' }}>
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
              <WalletsTable wallets={wallets} setWallets={setWallets} />
            </div>
          </div>
        </div>
        <div style={{ width: '20%' }}>
          <Chart array={wallets} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
