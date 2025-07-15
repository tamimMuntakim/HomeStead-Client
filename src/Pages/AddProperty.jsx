import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import useAxios from '../Hooks/useAxios';
import { useMutation } from '@tanstack/react-query';

const AddProperty = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const imgbbAPIKey = import.meta.env.VITE_imgbb_key;

    // Mutation for property POST
    const addPropertyMutation = useMutation({
        mutationFn: async (property) => {
            const res = await axiosInstance.post('/properties', property);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Property added successfully!",
                timer: 1500
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to add property",
                text: error.message,
                timer: 1500
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
                Swal.fire({
                    icon: "success",
                    title: "Image uploaded successfully!",
                    timer: 1000
                });
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to upload image",
                text: error.message,
            });
        } finally {
            setImageUploading(false);
        }
    };

    const handleAddProperty = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            Swal.fire({
                icon: "error",
                title: "Please upload an image first!",
                timer: 1500
            });
            return;
        }

        const formData = new FormData(e.target);
        const minPrice = parseInt(formData.get("minPrice"));
        const maxPrice = parseInt(formData.get("maxPrice"));

        if (minPrice >= maxPrice) {
            return Swal.fire({
                icon: "error",
                title: "Invalid price range",
                text: "Minimum price must be less than maximum price.",
                timer: 1500
            });
        }

        const property = {
            title: formData.get("title"),
            location: formData.get("location"),
            price:{
                minPrice,
                maxPrice
            },
            image: imageUrl,
            agentName: user.displayName,
            agentEmail: user.email,
            agentImage: user.photoURL,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        addPropertyMutation.mutate(property);
        e.target.reset();
        setImageUrl("");
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow-xl rounded-lg mt-4 md:mt-8">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary">Add New Property</h2>
            <form onSubmit={handleAddProperty}>
                <div className="form-control mb-4">
                    <label className="label font-semibold text-base">Property Title<span className='text-red-400'>*</span></label>
                    <input type="text" name="title" className="input input-bordered w-full" placeholder='Enter Property Title' required />
                </div>

                <div className="form-control mb-4">
                    <label className="label font-semibold text-base">Property Location<span className='text-red-400'>*</span></label>
                    <input type="text" name="location" className="input input-bordered w-full" placeholder='Enter Property Location' required />
                </div>

                <div className="form-control mb-4">
                    <label className="label font-semibold text-base">Price Range (৳)<span className='text-red-400'>*</span></label>
                    <div className='flex md:gap-2'>
                        <input type="number" name="minPrice" className="input input-bordered" placeholder='Minimum Price' required min={0}/>
                        <input type="number" name="maxPrice" className="input input-bordered" placeholder='Maximum Price' required min={0}/>
                    </div>
                </div>

                <div className="form-control mb-4">
                    <label className="label font-semibold text-base">Property Image<span className='text-red-400'>*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                    {imageUploading && <p className="text-sm mt-2 text-blue-600">Uploading image...</p>}
                    {imageUrl && <p className="text-sm mt-2 text-green-600">✅ Image uploaded</p>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full text-white"
                    disabled={imageUploading || addPropertyMutation.isPending}
                >
                    {addPropertyMutation.isPending ? "Submitting..." : "Add Property"}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
