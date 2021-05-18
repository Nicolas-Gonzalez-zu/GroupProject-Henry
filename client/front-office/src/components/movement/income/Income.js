import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import IncomeModalEdit from './IncomeModalEdit';
import IncomeAddModal from './IncomeAddModal';

const Income = () => {
  const incomes = useSelector((state) => state.movementReducer.movements);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(!showModal);
  };
  const incomesFiltered = incomes.filter((i) => i.type === 'INCOME');
  return (
    <div className="row">
      {console.log(incomesFiltered)}
      <div className="col-12">
        <div className="card card-info">
          <div className="d-flex bg-info justify-content-between w-100 p-2 rounded-top">
            <h3 className="">Movements - Income</h3>
            <IncomeAddModal showModal={showModal} showModalHandler={showModalHandler} />
          </div>
          <div className="card-body table-responsive p-0">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Generation Date</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {incomesFiltered &&
                  incomesFiltered.slice(0, 7).map((m) => (
                    <tr>
                      <td>{m.description}</td>
                      <td className="text-success">$ +{m.amount}</td>
                      <td>{m.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                      <td>{m.wallet.name}</td>
                      <td>
                        <IncomeModalEdit
                          description={m.description}
                          name={m.wallet.name}
                          id={m.id}
                          date={m.generation_date}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
