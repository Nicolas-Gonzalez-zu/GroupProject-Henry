import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IncomeModalEdit from './IncomeModalEdit';
import IncomeAddModal from './IncomeAddModal';
import InternalLoader from '../../loaders/InternalLoader';
import * as action from '../../../actions/creators';
import Emptypage from '../../FormDefault/Emptypage';

const Income = () => {
  const [loading, setLoading] = useState(true);
  const incomes = useSelector((state) => state.movementReducer.movements);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };

  useEffect(() => {
    action.getIncomes(dispatch);
    reset();
  }, [dispatch]);
  const incomesFiltered = incomes.filter((i) => i.type === 'INCOME');
  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-dark">
          {!loading && <InternalLoader />}
          <div className="d-flex bg-dark justify-content-between w-100 p-2 rounded-top">
            <h3 className="">Movements - Income</h3>
            <IncomeAddModal showModal={showModal} showModalHandler={showModalHandler} />
          </div>
          <div className="card-body mt-3">
            <div className="dataTables_wrapper dt-bootstrap4">
              {incomesFiltered.length === 0 ? (
                <Emptypage name="Incomes" />
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
