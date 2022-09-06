import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { checkoutCart } from '../../store/cart/Cart.actions';

import './CheckoutForm.css';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const cart = useSelector((state) => state.cart);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const processPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setIsPaymentLoading(true);
      const cardElement = elements.getElement(CardElement);

      const { token } = await stripe.createToken(cardElement);

      await dispatch(checkoutCart({ cartId: cart.id, paymentInfo: token }));
      setIsPaymentLoading(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div style={{ padding: '3rem', width: '100%' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form action="" style={{ display: 'block', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CardElement
              className="card"
              option={{
                style: {
                  base: {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
              onClick={processPayment}
            >
              {isPaymentLoading ? 'Loading' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
