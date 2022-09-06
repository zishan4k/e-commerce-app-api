import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div style={{ display: 'flex', backgroundColor: 'blue' }}>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Checkout;
