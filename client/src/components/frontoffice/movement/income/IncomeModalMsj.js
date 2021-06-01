import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const IncomeModalMsj = ({ errors, setShowIncomeMsj, onSubmitHandler, showIncomeMsj }) => {
  const setShowIncomeMsjHandler = () => {
    setShowIncomeMsj(!showIncomeMsj);
  };
  return (
    <div>
      <Button onClick={onSubmitHandler} className="btn btn-success">
        Add Income
      </Button>
      <Modal show={showIncomeMsj}>
        <Modal.Header className={errors ? 'bg-danger' : 'bg-success'}>
          {errors ? <h3>Error!</h3> : <h3>Success!</h3>}
        </Modal.Header>
        <Modal.Body className={errors ? 'bg-danger' : 'bg-success'}>
          {errors ? (
            <p>The income cant be added, please try again!</p>
          ) : (
            <h6>
              <b>Income Added!</b>
            </h6>
          )}
        </Modal.Body>
        <Modal.Footer className={errors ? 'bg-danger' : 'bg-success'}>
          <Button onClick={setShowIncomeMsjHandler}>close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default IncomeModalMsj;
