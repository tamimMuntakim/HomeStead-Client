import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentForm from '../Components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);
    return (
        <>
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary my-4">Make Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </>
    );
};

export default Payment;