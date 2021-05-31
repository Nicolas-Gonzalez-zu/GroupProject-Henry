import React from 'react';

export default function ServicesBO() {
  const services = [
    {
      id: 1,
      name: 'Savings Account',
      price: '52471.89',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      img_url: 'Investment Account',
      categories: [
        {
          id: 1,
          name: 'Beauty',
        },
        {
          id: 2,
          name: 'Toys',
        },
        {
          id: 3,
          name: 'Tools',
        },
      ],
    },
    {
      id: 2,
      name: 'Auto Loan Account',
      price: '48126.40',
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      img_url: 'Auto Loan Account',
      categories: [
        {
          id: 1,
          name: 'Beauty',
        },
        {
          id: 2,
          name: 'Toys',
        },
        {
          id: 3,
          name: 'Tools',
        },
      ],
    },
    {
      id: 3,
      name: 'Money Market Account',
      price: '608.12',
      description: 'There are many variations of passages of Lorem Ipsum available.',
      img_url: 'Auto Loan Account',
      categories: [
        {
          id: 1,
          name: 'Beauty',
        },
        {
          id: 2,
          name: 'Toys',
        },
        {
          id: 3,
          name: 'Tools',
        },
      ],
    },
    {
      id: 4,
      name: 'Personal Loan Account',
      price: '7721.57',
      description: 'Money Market Account',
      img_url: 'Auto Loan Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 5,
      name: 'Credit Card Account',
      price: '19300.00',
      description: 'Credit Card Account',
      img_url: 'Home Loan Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 6,
      name: 'Money Market Account',
      price: '35169.77',
      description: 'Investment Account',
      img_url: 'Credit Card Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 7,
      name: 'Checking Account',
      price: '75637.34',
      description: 'Credit Card Account',
      img_url: 'Home Loan Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 8,
      name: 'Investment Account',
      price: '53200.65',
      description: 'Investment Account',
      img_url: 'Credit Card Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 9,
      name: 'Savings Account',
      price: '62213.09',
      description: 'Home Loan Account',
      img_url: 'Money Market Account',
      categories: [
        {
          id: 4,
          name: 'Movies',
        },
      ],
    },
    {
      id: 11,
      name: 'Pro-Account',
      price: '300.00',
      description: 'Pro',
      img_url: 'proimg',
      categories: [
        {
          id: 6,
          name: 'Benefits',
        },
      ],
    },
    {
      id: 12,
      name: 'Pro-Account',
      price: '300.00',
      description: 'Pro',
      img_url: 'proimg',
      categories: [
        {
          id: 6,
          name: 'Benefits',
        },
      ],
    },
    {
      id: 13,
      name: 'Pro-Accounts',
      price: '300.00',
      description: 'Pro',
      img_url: 'proimg',
      categories: [
        {
          id: 6,
          name: 'Benefits',
        },
      ],
    },
    {
      id: 10,
      name: 'Pro Account',
      price: '300.00',
      description: 'Pro',
      img_url: 'proimg',
      categories: [],
    },
  ];
  return (
    <div>
      <div className="row">
        {services &&
          services.map((s) => (
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column ">
              <div className="card bg-light d-flex ">
                <div className="card-header border-bottom-0 text-center">Service ID : {s.id}</div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="">
                      <h2 className="lead">
                        <b>Nicole Pearson</b>
                      </h2>
                      <p className="text-muted text-sm">
                        <b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex flex-row-reverse">
                  <button type="button">Edit</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
