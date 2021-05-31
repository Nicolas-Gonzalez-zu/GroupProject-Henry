import React from 'react';
import NewCategories from './newCategories';
import EditCategories from './editCategories';

export default function Categories() {
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
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-around">
            <h3>Categories</h3>
            <NewCategories />
          </div>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th style={{ width: '1rem' }}>Edit</th>
              </tr>
            </thead>
            {categories &&
              categories.map((x) => (
                <tbody>
                  <tr>
                    <td>{x.id}</td>
                    <td>{x.name}</td>

                    <td>
                      <EditCategories id={x.id} />
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
