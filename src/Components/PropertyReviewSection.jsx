import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import useAuth from '../Hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';

const PropertyReviewSection = ({ propertyId, propertyTitle }) => {
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [reviewText, setReviewText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', propertyId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/reviews?propertyId=${propertyId}`);
            return res.data;
        },
        enabled: !!propertyId,
    });

    const hasReviewed = reviews.some(r => r.reviewerEmail === user?.email);

    const addReviewMutation = useMutation({
        mutationFn: async (newReview) => {
            const res = await axiosInstance.post('/reviews', newReview);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', propertyId]);
            setReviewText("");
            setIsModalOpen(false);
            Swal.fire({ icon: 'success', title: 'Review added!', timer: 1000 });
        },
        onError: (err) => {
            Swal.fire({ icon: 'error', title: 'Error', text: err.message });
        }
    });

    const handleSubmitReview = () => {
        if (!reviewText.trim()) return;

        const newReview = {
            propertyId,
            propertyTitle,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerImage: user.photoURL,
            reviewText,
            reviewedAt: new Date().toISOString()
        };

        addReviewMutation.mutate(newReview);
    };

    return (
        <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-base-200 p-4 rounded-md shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold">{review.reviewerName}</p>
                                    <p className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(review.reviewedAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">{review.reviewText}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6">
                {
                    hasReviewed ? (
                        <button
                            className="btn btn-success btn-sm text-white">
                            Review Submitted
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-sm text-white"
                            onClick={() => setIsModalOpen(true)}>
                            Add Review
                        </button>
                    )
                }
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-11/12 max-w-md">
                        <h4 className="text-lg font-semibold mb-3">Add a Review</h4>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="textarea textarea-bordered w-full h-28 mb-4"
                            placeholder="Write your review here..."
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button className="btn btn-sm btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button
                                className="btn btn-sm btn-primary text-white"
                                onClick={handleSubmitReview}
                                disabled={addReviewMutation.isPending}
                            >
                                {addReviewMutation.isPending ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyReviewSection;