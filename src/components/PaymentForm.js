import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ orderId, onPaymentMethodIdReceived }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        onPaymentMethodIdReceived(id); // Notify parent component of the payment method ID
        const response = await fetch('http://localhost:8000/api/payments/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderId,
            payment_method_id: id,
          }),
        });

        const paymentResult = await response.json();

        if (paymentResult.message === 'Payment successful') {
          setSuccess(true);
        } else {
          console.error('Payment failed:', paymentResult.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={{ hidePostalCode: true }} />
            </div>
          </fieldset>
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>Payment Successful!</h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;