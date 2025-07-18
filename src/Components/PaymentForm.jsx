import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../Hooks/useAxios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const navigate = useNavigate();
    const { offerId } = useParams();

    const { user } = useAuth();

    const stripe = useStripe();
    const elements = useElements();

    const axiosInstance = useAxios();

    const [paymentError, setPaymentError] = useState('');

    const queryClient = useQueryClient();

    const { data: offer = {}, isLoading, isError } = useQuery({
        queryKey: ['offer', offerId],
        enabled: !!offerId,
        queryFn: async () => {
            const res = await axiosInstance.get(`/offers/${offerId}`);
            return res.data;
        },
    });

    const updatePaymentMutation = useMutation({
        mutationFn: async ({ offerId, transactionId }) => {
            const res = await axiosInstance.patch(`/offers/${offerId}/payment`, { transactionId });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['offer', offerId]);
            Swal.fire({
                icon: 'success',
                title: 'Payment successfull!',
                timer: 1500
            });
            navigate("/dashboard/properties-bought");
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Payment succeeded but failed to update offer status.',
                timer: 1500
            });
        }
    });

    if (isLoading) return <p className='text-center mt-10'>Loading offer details...</p>;
    if (isError) return <p className='text-center mt-10 text-red-500'>Error loading offer.</p>;

    const amountInCents = offer?.offerAmount * 100;

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            setPaymentError(error.message);
        } else {
            setPaymentError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        const intentRes = await axiosInstance.post('/create-payment-intent', {
            amountInCents,
            offerId
        });
        const clientSecret = intentRes?.data?.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });

        if (result.error) {
            setPaymentError(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;
                updatePaymentMutation.mutate({ offerId, transactionId });
            }
        }



    }
    return (
        <div>
            <form onSubmit={handleFormSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto border border-blue-200'>
                <h3 className="md:text-lg font-semibold mb-2 text-center">Property: {offer.propertyTitle}</h3>
                <p className='text-sm md:text-base text-center'>Amount: $ {offer?.offerAmount?.toLocaleString()}</p>

                <CardElement className='p-4 rounded border border-blue-200 shadow'>
                </CardElement>
                {
                    paymentError && <p className="text-red-500 text-xs mt-2 md:mt-4">{paymentError}</p>
                }
                <button type="submit" disabled={!stripe} className='btn btn-primary text-white btn-xs md:btn-sm w-full mt-2 md:mt-4'>Pay ${offer?.offerAmount?.toLocaleString()} </button>
            </form>
        </div>
    );
};

export default PaymentForm;