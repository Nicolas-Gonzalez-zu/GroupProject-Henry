import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Paypal(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const clientID =
    'ATK6DdOJdEQoswVzUM9ElU9kuS1PfKWSt6hFoyPmqiAjOVq3DU8UXUTAMd_-HfBkXvQcwGyhwLC93Iww';

  const addPaypalSdk = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&disable-funding=card,mercadopago`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (window !== undefined && window.paypal !== undefined && props.onButtonReady) {
      props.onButtonReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '0.01', // props.amount
          },
        },
      ],
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then((details) => {
        if (props.onSuccess) {
          return props.onSuccess(data);
        }
        return details;
      })
      .catch((err) => {
        console.log(err);
      });

  if (!sdkReady && window.paypal === undefined) {
    return <div>Loading...</div>;
  }

  const PaypalButton = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM,
  });

  return (
    <PaypalButton
      // {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      style={{
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
      }}
    />
  );
}
