import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import MultiSelect from 'react-multi-select-component';
import * as action from '../../../actions/backoffice/creators';

export default function EditService({ categories, name, price, description, id }) {
  const [state, setstate] = useState(false);
  const [selected, setSelected] = useState([]);
  const category = useSelector((statee) => statee.categoryBOReducer.category);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();
  const on = true;

  const setModalHandler = () => {
    setstate(!state);
  };

  useEffect(() => {
    if (authAlert.fire) {
      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        action.setAlert(dispatch);
      });
    }
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  useEffect(() => {
    action.getCategory(dispatch);
  }, [dispatch]);
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }
    if (!values.price) {
      errors.price = 'The price is required!';
    } else if (!/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/gm.test(values.price)) {
      errors.price = 'This field only accept numbers!';
    }
    if (!values.description) {
      errors.description = 'Description Required';
    } else if (values.description.length < 2) {
      errors.description = 'Description Required Must have at least 3 letters';
    }
    if (selected.length === 0) {
      errors.selected = 'Need a Category';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      status: '-',
      name,
      price,
      description,
    },
    validate,
    onSubmit: (values) => {
      const cate = selected.map((x) => x.value);

      const newValues = {
        ...values,
        status: Boolean(values.status),
        service_id: id,
        img_url: 'none',
        modifiedCategories: {
          oldCategories: categories.map((x) => x.id),
          newCategories: cate,
        },
      };
      console.log(newValues, 'nuevos');
      action.changeService(newValues, dispatch);
      setTimeout(() => {
        setModalHandler();
        formik.resetForm(
          { status: '', name: '', price: '', description: '', img_url: '' },
          setSelected([]),
        );
      }, 1500);
    },
    enableReinitialize: true,
  });

  const options = category.map((c) => {
    const aux = { label: c.name, value: c.id };
    return aux;
  });

  return (
    <div>
      <Button onClick={setModalHandler} className="btn bg-navy">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={state}>
        <Modal.Header>
          <h3>Edit a Category</h3>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-center ">
            <div className="d-flex flex-column">
              <label className="align-self-center">Status</label>
              <select
                onChange={formik.handleChange}
                value={formik.values.status}
                id="status"
                className=" ml-2 border rounded  "
              >
                <option>-</option>
                <option value={on}>Active</option>
                <option value="">Inactive</option>
              </select>
              {formik.errors.status ? (
                <b className="text-danger text-center">{formik.errors.status}</b>
              ) : (
                <br />
              )}
              <b className="text-center">Name</b>
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                className=" ml-2 border rounded  "
              />{' '}
              {formik.errors.name ? (
                <b className="text-danger text-center">{formik.errors.name}</b>
              ) : (
                <br />
              )}
              <b className="text-center">Description</b>
              <input
                onChange={formik.handleChange}
                value={formik.values.description}
                id="description"
                className=" ml-2 border rounded "
              />
              {formik.errors.description ? (
                <b className="text-danger text-center">{formik.errors.description}</b>
              ) : (
                <br />
              )}{' '}
              <b className="text-center">Price</b>
              <input
                onChange={formik.handleChange}
                value={formik.values.price}
                id="price"
                className=" ml-2 border rounded "
              />
              {formik.errors.price ? (
                <b className="text-danger text-center">{formik.errors.price}</b>
              ) : (
                <br />
              )}{' '}
              <b className="text-center">Category</b>
              <div className="d-flex justify-content-center">
                Categories before:
                {categories.map((x) => (
                  <span className="text-info"> {x.name} -</span>
                ))}
              </div>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                className="col-13"
              />{' '}
              {formik.errors.selected ? (
                <b className="text-danger text-center">{formik.errors.selected}</b>
              ) : (
                <br />
              )}
            </div>
          </div>
          <Modal.Footer>
            <Button type="submit" className="btn btn-success col-2">
              Create
            </Button>

            <Button onClick={setModalHandler} className="btn btn-danger col-2">
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
