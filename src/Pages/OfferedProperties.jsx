import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const getStatusBadge = (status) => {
    switch (status) {
        case 'accepted':
            return (
                <span className="badge bg-green-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCheckCircle /> Accepted
                </span>
            );
        case 'rejected':
            return (
                <span className="badge bg-red-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCancel /> Rejected
                </span>
            );
        case 'pending':
            return (
                <span className="badge bg-yellow-400 text-black flex items-center gap-1 px-2 py-1 text-xs shadow">
                    Pending
                </span>
            );
        default:
            return null;
    }
};

const OfferedProperties = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const { data: offers = [], isLoading, isError } = useQuery({
        queryKey: ['agent-offers', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosInstance.get(`/offers-by-agent?agentEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ offerId, status, propertyId }) => {
            const res = await axiosInstance.put(`/offers/${offerId}/status`, { status, propertyId });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Offer status updated!',
                timer: 1500,
                showConfirmButton: false,
            });
            queryClient.invalidateQueries(['agent-offers', user.email]);
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update status',
                text: error.message || 'Something went wrong',
            });
        },
    });

    if (isLoading) return <div className="text-center py-10 font-semibold">Loading offers...</div>;
    if (isError) return <div className="text-center py-10 text-red-500 font-semibold">Failed to load offers.</div>;
    if (!offers.length) return <div className="text-center py-10 text-gray-500 font-semibold">No offers found for your properties.</div>;

    const isUpdating = updateStatusMutation.isLoading;

    return (
        <div className="overflow-x-auto w-full md:w-11/12 container mx-auto rounded-md bg-white mt-6 p-6">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary md:mt-4">Offered Properties</h2>

            <table className="table w-full text-center">
                <thead className="bg-base-200">
                    <tr>
                        <th>Property Title</th>
                        <th>Location</th>
                        <th>Buyer Email</th>
                        <th>Buyer Name</th>
                        <th>Offered Price (৳)</th>
                        <th>Status / Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map((offer) => {
                        const isPending = offer.status === 'pending';
                        return (
                            <tr key={offer._id}>
                                <td>{offer.propertyTitle}</td>
                                <td>{offer.propertyLocation}</td>
                                <td>{offer.buyerEmail}</td>
                                <td>{offer.buyerName}</td>
                                <td>{typeof offer.offerAmount === 'number' ? offer.offerAmount.toLocaleString() : 'N/A'}</td>
                                <td>
                                    {isPending ? (
                                        <div className="flex gap-2">
                                            <button
                                                disabled={isUpdating}
                                                onClick={() =>
                                                    updateStatusMutation.mutate({
                                                        offerId: offer._id,
                                                        status: 'accepted',
                                                        propertyId: offer.propertyId,
                                                    })
                                                }
                                                className="btn btn-xs btn-success text-white"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                disabled={isUpdating}
                                                onClick={() =>
                                                    updateStatusMutation.mutate({
                                                        offerId: offer._id,
                                                        status: 'rejected',
                                                        propertyId: offer.propertyId,
                                                    })
                                                }
                                                className="btn btn-xs btn-error text-white"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        getStatusBadge(offer.status)
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OfferedProperties;
