import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';

export default function NewService() {
  const [state, setstate] = useState(false);
  const [selected, setSelected] = useState([]);

  const categories = [
    {
      id: 1,
      name: 'Beauty',
      createdAt: '2020-10-17T10:41:51.124Z',
      updatedAt: '2021-09-01T17:21:22.872Z',
    },
    {
      id: 2,
      name: 'Toys',
      createdAt: '2021-03-19T17:39:19.083Z',
      updatedAt: '2021-12-02T07:24:22.774Z',
    },
    {
      id: 3,
      name: 'Tools',
      createdAt: '2021-04-09T14:22:05.230Z',
      updatedAt: '2021-06-27T06:46:13.549Z',
    },
    {
      id: 4,
      name: 'Movies',
      createdAt: '2020-12-31T11:45:27.732Z',
      updatedAt: '2022-03-02T17:18:04.396Z',
    },
    {
      id: 5,
      name: 'Baby',
      createdAt: '2020-06-26T16:09:11.672Z',
      updatedAt: '2021-12-18T04:49:13.725Z',
    },
    {
      id: 6,
      name: 'Benefits',
      createdAt: '2021-05-25T02:24:48.643Z',
      updatedAt: '2021-05-25T02:24:48.643Z',
    },
  ];

  const setModalHandler = () => {
    setstate(!state);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }
    if (!values.price) {
      errors.price = 'The price is required!';
    } else if (!/^[0-9]*$/gm.test(values.price)) {
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
      name: '',
      price: '',
      description: '',
    },
    validate,
    onSubmit: (values) => {
      const cate = selected.map((x) => x.value);
      const newValues = { ...values, categories: cate, img_url: 'none' };
      alert(JSON.stringify(newValues, null, 2));
      setTimeout(() => {
        setModalHandler();
        formik.resetForm(
          {
            name: '',
            price: '',
            description: '',
            img_url: '',
          },
          setSelected([]),
        );
      }, 1500);
    },
  });

  const options = categories.map((c) => {
    const aux = { label: c.name, value: c.id };
    return aux;
  });

  return (
    <div>
      <Button onClick={setModalHandler} className="btn bg-navy">
        Create a New Service
      </Button>
      <Modal show={state}>
        <Modal.Header>
          <h3>Create a new Category</h3>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-center ">
            <div className="d-flex flex-column">
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
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                className="col-13"
              />
              {formik.errors.selected ? (
                <b className="text-danger text-center">{formik.errors.selected}</b>
              ) : (
                <br />
              )}{' '}
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
