import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';
import useLatestReviews from '../Hooks/useLatestReviews';

const ManageReviews = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    // ✅ Using the custom hook instead of raw useQuery
    const { data: reviews = [], isLoading } = useLatestReviews();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosInstance.delete(`/reviews/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({ icon: 'success', title: 'Review deleted!', timer: 1000 });
            queryClient.invalidateQueries(['latest-reviews']);
        },
        onError: (err) => {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the review.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <div className="text-center py-10 font-semibold">Loading reviews...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">Manage All Reviews</h2>

            {reviews.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-10">
                    No reviews found.
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-base-200 p-4 rounded-md shadow-sm">
                            <div className="mb-2 space-y-1">
                                <p className="font-semibold text-base text-gray-800">
                                    Property: <span className="font-normal">{review.propertyTitle}</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Reviewer: <span className="text-blue-600">{review.reviewerEmail}</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    Reviewed {formatDistanceToNow(new Date(review.reviewedAt), { addSuffix: true })}
                                </p>
                            </div>
                            <p className="text-gray-700 text-sm">{review.reviewText}</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-sm btn-outline btn-error"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
