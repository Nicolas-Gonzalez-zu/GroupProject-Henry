import { Redirect, useLocation } from 'react-router-dom';

const PaymentConfirmation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentStatus = params.get('status');
  const invoiceId = params.get('merchant_order_id');
  if (paymentStatus === 'approved') {
    return <Redirect to={`/client/invoice/${invoiceId}`} />;
  }
  return <Redirect to="/client/cart" />;
};

export default PaymentConfirmation;
