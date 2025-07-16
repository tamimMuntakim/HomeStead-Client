import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../Hooks/useAxios';

const ManageUsers = () => {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosInstance.get('/all-users');
            return res.data;
        }
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ id, newRole }) => {
            const res = await axiosInstance.patch(`/users/role/${id}`, { role: newRole });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-users']);
            queryClient.invalidateQueries(['all-properties']);
            Swal.fire({ icon: 'success', title: 'Role updated!', timer: 1000 });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async ({ id, email }) => {
            const res = await axiosInstance.delete(`/users/${id}?email=${email}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-users']);
            Swal.fire({ icon: 'success', title: 'User deleted!', timer: 1000 });
        }
    });

    const handleMarkFraud = async (user) => {
        const result = await Swal.fire({
            title: `Mark ${user.userDisplayName} as Fraud?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, mark as fraud!'
        });

        if (result.isConfirmed) {
            updateRoleMutation.mutate({ id: user._id, newRole: 'fraud' });
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-primary md:mt-4">Manage All Users</h2>
            <table className="table w-full text-center">
                <thead className="bg-base-200">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.userDisplayName}</td>
                            <td>{user.userEmail}</td>
                            <td className="capitalize">{user.role}</td>
                            <td className="space-x-2">
                                {user.role === 'fraud' ? (
                                    <span className="badge bg-red-500 text-white shadow px-2 py-1 text-xs">Fraud</span>
                                ) : user.role === 'user' ? (
                                    <>
                                        <button
                                            onClick={() => updateRoleMutation.mutate({ id: user._id, newRole: 'admin' })}
                                            className="btn btn-xs btn-info text-white"
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                            onClick={() => updateRoleMutation.mutate({ id: user._id, newRole: 'agent' })}
                                            className="btn btn-xs btn-success text-white"
                                        >
                                            Make Agent
                                        </button>
                                    </>
                                ) : user.role === 'agent' ? (
                                    <>
                                        <button
                                            onClick={() => updateRoleMutation.mutate({ id: user._id, newRole: 'admin' })}
                                            className="btn btn-xs btn-info text-white"
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                            onClick={() => handleMarkFraud(user)}
                                            className="btn btn-xs btn-warning text-white"
                                        >
                                            Mark as Fraud
                                        </button>
                                    </>
                                ) : null}

                                <button
                                    onClick={() => deleteMutation.mutate({ id: user._id, email: user.userEmail })}
                                    className="btn btn-xs btn-error text-white"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
