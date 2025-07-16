import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import usePropertyById from '../Hooks/usePropertyById';

const UpdatePropertyDetails = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [imageUrl, setImageUrl] = useState("");
    const [imageUploading, setImageUploading] = useState(false);

    const imgbbAPIKey = import.meta.env.VITE_imgbb_key;

    const { data: property, isLoading } = usePropertyById(id);

    useEffect(() => {
        if (property?.image) setImageUrl(property.image);
    }, [property]);

    const updateMutation = useMutation({
        mutationFn: async (updatedProperty) => {
            const res = await axiosInstance.put(`/properties/${id}`, updatedProperty);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Property updated successfully!',
                timer: 1500
            });
            navigate('/dashboard/my-added-properties');
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update property',
                text: err.message,
            });
        }
    });

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        if (!imageFile) return;
        setImageUploading(true);

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
            if (res.data.success) {
                setImageUrl(res.data.data.url);
                Swal.fire({ icon: 'success', title: 'Image uploaded!', timer: 1000 });
            } else throw new Error("Image upload failed");
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Upload failed', text: err.message });
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const minPrice = parseInt(formData.get('minPrice'));
        const maxPrice = parseInt(formData.get('maxPrice'));

        if (minPrice >= maxPrice) {
            return Swal.fire({ icon: 'error', title: 'Invalid price range' });
        }

        const updatedProperty = {
            title: formData.get('title'),
            location: formData.get('location'),
            image: imageUrl,
            price: { minPrice, maxPrice },
            status: property.status,
        };

        updateMutation.mutate(updatedProperty);
    };

    if (isLoading || !property) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow-xl rounded-lg mt-4 md:mt-8">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">Update Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Property Title</label>
                    <input defaultValue={property.title} name="title" className="input input-bordered w-full" required />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Property Location</label>
                    <input defaultValue={property.location} name="location" className="input input-bordered w-full" required />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Agent Name</label>
                    <input value={user.displayName} readOnly className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Agent Email</label>
                    <input value={user.email} readOnly className="input input-bordered w-full" />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Price Range (৳)</label>
                    <div className='flex gap-2'>
                        <input
                            type="number"
                            name="minPrice"
                            className="input input-bordered w-full"
                            defaultValue={property.price.minPrice}
                            required
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            className="input input-bordered w-full"
                            defaultValue={property.price.maxPrice}
                            required
                        />
                    </div>
                </div>
                <div className="form-control mb-4">
                    <label className="label font-semibold">Change Image (optional)</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                    {imageUploading && <p className='text-sm text-blue-500 mt-1'>Uploading...</p>}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white"
                    disabled={imageUploading || updateMutation.isPending}
                >
                    {updateMutation.isPending ? 'Updating...' : 'Update Property'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePropertyDetails;
