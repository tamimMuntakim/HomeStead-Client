import React from 'react';
import { FaMapMarkerAlt, FaMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdAccessTimeFilled, MdCheckCircle, MdCancel } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import useAuth from '../Hooks/useAuth';

const AddedPropertyCard = ({ property }) => {
    const {
        _id,
        title,
        location,
        image,
        agentName,
        agentImage,
        status,
        price
    } = property;

    const {user} = useAuth();
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(`/properties/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Property deleted successfully!',
                timer: 1500
            });
            queryClient.invalidateQueries(['my-properties', user?.email]); // ⬅️ Refetch My Properties
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Delete failed!',
                text: err.message,
                timer: 1500
            });
        }
    });

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(_id);
            }
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="absolute top-2 right-2 badge bg-yellow-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow badge-xs md:badge-sm">
                        <MdAccessTimeFilled /> Pending
                    </span>
                );
            case 'verified':
                return (
                    <span className="absolute top-2 right-2 badge bg-green-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                        <MdCheckCircle /> Verified
                    </span>
                );
            case 'rejected':
                return (
                    <span className="absolute top-2 right-2 badge bg-red-500 text-white flex items-center gap-1 px-3 py-2 text-xs shadow">
                        <MdCancel /> Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full transition hover:shadow-xl">
            <div className="relative h-36 md:h-48 w-full overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                {getStatusBadge(status)}
            </div>

            <div className="p-4 flex flex-col justify-between flex-grow space-y-2">
                <div>
                    <h2 className="md:text-lg font-semibold text-black">{title}</h2>

                    <p className="flex items-center gap-1 text-xs md:text-sm text-gray-600 mt-1">
                        <FaMapMarkerAlt /> {location}
                    </p>

                    <p className="flex items-center gap-2 text-xs md:text-sm mt-2 text-gray-600">
                        <FaMoneyBillAlt />
                        BDT {price?.minPrice?.toLocaleString()} - {price?.maxPrice?.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                        <img src={agentImage} alt={agentName} className="w-6 h-6 rounded-full" />
                        <span className="text-xs md:text-sm font-medium">{agentName}</span>
                    </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    {status !== 'rejected' && (
                        <Link className="btn btn-sm btn-outline btn-primary flex items-center gap-1" to={`/dashboard/update-property-details/${_id}`}>
                            <AiOutlineEdit /> Update
                        </Link>
                    )}
                    <button
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        <AiOutlineDelete /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddedPropertyCard;
