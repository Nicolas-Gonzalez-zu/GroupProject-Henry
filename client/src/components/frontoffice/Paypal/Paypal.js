import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export default function Paypal(props) {
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const paypal = useRef();
  const [sdkReady, setSdkReady] = useState(false);
  const clientID =
    'ATK6DdOJdEQoswVzUM9ElU9kuS1PfKWSt6hFoyPmqiAjOVq3DU8UXUTAMd_-HfBkXvQcwGyhwLC93Iww';
  const { items } = props;
  const value = items.map((i) => Number(i.unit_amount.value)).reduce((acc, curr) => acc + curr);
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
    }
  }, []);
  useEffect(() => {
    if (window !== undefined && window.paypal !== undefined) {
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay',
          },
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description: user.id.toString(),
                  amount: {
                    currency_code: 'USD',
                    value: value.toString(),
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: value.toString(),
                      },
                    },
                  },
                  items,
                },
              ],
            }),
          onApprove: (data, actions) =>
            actions.order
              .capture()
              .then((details) => {
                console.log(details);
                Swal.fire(
                  'Done!',
                  `Transaction completed by ${details.payer.name.given_name}`,
                  'success',
                );
              })
              .catch((err) => {
                console.log(err);
              }),
        })
        .render(paypal.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady]);

  if (!sdkReady && window.paypal === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div ref={paypal} className="mt-2" />
    </div>
  );
}
