import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { format } from 'date-fns';

const MyProfile = () => {
    const { user } = useAuth();
    const { role } = useUserRole(user?.email);

    const formattedCreatedAt = user?.metadata?.creationTime
        ? format(new Date(user.metadata.creationTime), 'dd MMM yyyy, h:mm a')
        : 'N/A';

    const formattedLastLogin = user?.metadata?.lastSignInTime
        ? format(new Date(user.metadata.lastSignInTime), 'dd MMM yyyy, h:mm a')
        : 'N/A';

    const getRoleStyle = (role) => {
        switch (role) {
            case 'admin':
                return 'badge badge-success text-white badge-sm md:badge-md';
            case 'agent':
                return 'badge badge-secondary text-white badge-sm md:badge-md';
            default:
                return 'badge badge-primary text-white badge-sm md:badge-md';
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg p-6 mt-8">
            <div className="flex flex-col items-center text-center">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/KxV3xWSC/icons8-user-96.png'}
                    alt="User Profile"
                    className="w-16 h-1w-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-primary"
                />
                <h2 className="text-lg md:text-2xl font-semibold mt-4">{user?.displayName || 'Anonymous User'}</h2>
                <div className="mt-2">
                    <span className={getRoleStyle(role)}>
                        {role?.charAt(0).toUpperCase() + role?.slice(1)}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between text-sm md:text-base">
                    <span className="font-semibold">Email:</span>
                    <span>{user?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                    <span className="font-semibold">Created At:</span>
                    <span>{formattedCreatedAt}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                    <span className="font-semibold">Last Login:</span>
                    <span>{formattedLastLogin}</span>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
