import React from 'react';

const WalletTable = ({ wallets, setWallets }) => {
  const walletsFilter = (name) => {
    setWallets(wallets.filter((w) => w.name !== name));
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {wallets &&
          wallets.map((w, i) => (
            <tr>
              <td>{w.name}</td>
              <td>${w.amount}</td>
              <td className="text-right py-0 align-middle">
                <div className="btn-group btn-group-sm">
                  {/* <a href="#" className="btn btn-info">
                  <i className="fas fa-eye" />
                </a> */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => walletsFilter(w.name)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default WalletTable;
