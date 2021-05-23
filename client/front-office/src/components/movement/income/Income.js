import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import IncomeModalEdit from './IncomeModalEdit';
import IncomeAddModal from './IncomeAddModal';
import InternalLoader from '../../loaders/InternalLoader';

const Income = () => {
  const incomes = useSelector((state) => state.movementReducer.movements);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(!showModal);
  };
  const incomesFiltered = incomes.filter((i) => i.type === 'INCOME');
  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-dark">
          {incomesFiltered.length === 0 && <InternalLoader />}
          <div className="d-flex bg-dark justify-content-between w-100 p-2 rounded-top">
            <h3 className="">Movements - Income</h3>
            <IncomeAddModal showModal={showModal} showModalHandler={showModalHandler} />
          </div>
          <div className="card-body mt-3">
            <div className="dataTables_wrapper dt-bootstrap4">
              <table className="table table-bordered table-hover dataTable dtr-inline">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Generation Date</th>
                    <th>To</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                {incomesFiltered &&
                  incomesFiltered.slice(0, 7).map((m) => (
                    <tbody>
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.description}</td>
                        <td className="text-success">$ +{m.amount}</td>
                        <td>{m.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                        <td>{m.wallet.name}</td>
                        <div className="d-flex justify-content-center">
                          <td className="border-0">
                            <IncomeModalEdit
                              description={m.description}
                              name={m.wallet.name}
                              id={m.id}
                              date={m.generation_date}
                            />
                          </td>
                        </div>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
