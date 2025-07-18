import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import Swal from 'sweetalert2';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const getStatusBadge = (status) => {
    switch (status) {
        case 'verified':
            return (
                <span className="badge bg-green-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCheckCircle /> Verified
                </span>
            );
        case 'rejected':
            return (
                <span className="badge bg-red-500 text-white flex items-center gap-1 px-2 py-1 text-xs shadow">
                    <MdCancel /> Rejected
                </span>
            );
        default:
            return null;
    }
};

const ManageProperties = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const { data: properties = [], isLoading } = useQuery({
        queryKey: ['all-properties'],
        queryFn: async () => {
            const res = await axiosInstance.get('/properties');
            return res.data;
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            const res = await axiosInstance.patch(`/properties/status/${id}`, { status: newStatus });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-properties']);
            Swal.fire({
                icon: 'success',
                title: 'Status updated!',
                timer: 1000
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update status',
                text: err.message,
                timer: 1500
            });
        }
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary md:mt-4">Manage All Properties</h2>
            <table className="table w-full text-center">
                <thead className="bg-base-200">
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Agent</th>
                        <th>Price Range</th>
                        <th>Status / Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td>{property.title}</td>
                            <td>{property.location}</td>
                            <td>{property.agentName} ({property.agentEmail})</td>
                            <td>
                                $ {property.price.minPrice.toLocaleString()} - {property.price.maxPrice.toLocaleString()}
                            </td>
                            <td>
                                {property.status === 'pending' ? (
                                    <div className="space-x-2">
                                        <button
                                            disabled={updateStatusMutation.isPending}
                                            onClick={() =>
                                                updateStatusMutation.mutate({
                                                    id: property._id,
                                                    newStatus: 'verified'
                                                })
                                            }
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            Verify
                                        </button>
                                        <button
                                            disabled={updateStatusMutation.isPending}
                                            onClick={() =>
                                                updateStatusMutation.mutate({
                                                    id: property._id,
                                                    newStatus: 'rejected'
                                                })
                                            }
                                            className="btn btn-xs btn-error text-white"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    getStatusBadge(property.status)
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProperties;
