import React from 'react';
import './DashMenu.css';
import { NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import {
    MdFavorite,
    MdHome,
    MdReviews,
    MdAddHome,
    MdSell,
    MdPeople,
    MdRateReview,
    MdManageHistory
} from 'react-icons/md';
import { BiSolidOffer } from "react-icons/bi";
import { FaClipboardList, FaHouseUser } from 'react-icons/fa';

const DashboardMenu = () => {
    const { user } = useAuth();
    const { role, isLoading } = useUserRole(user?.email);

    if (isLoading) {
        return <div className="text-center py-6">Loading menu...</div>;
    }

    return (
        <ul className="menu w-full text-center md:space-y-2">
            <li>
                <NavLink to="/dashboard" className="dash-menu-navs" end>
                    <FaHouseUser className="inline mr-1" /> My Profile
                </NavLink>
            </li>

            {/* For regular users */}
            {role === 'user' && (
                <>
                    <li>
                        <NavLink to="/dashboard/my-wishlist" className="dash-menu-navs">
                            <MdFavorite className="inline mr-1" /> My Wishlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/properties-bought" className="dash-menu-navs">
                            <MdHome className="inline mr-1" /> Properties Bought
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-reviews" className="dash-menu-navs">
                            <MdReviews className="inline mr-1" /> My Reviews
                        </NavLink>
                    </li>
                </>
            )}

            {/* For agents only */}
            {role === 'agent' && (
                <>
                    <li>
                        <NavLink to="/dashboard/add-property" className="dash-menu-navs">
                            <MdAddHome className="inline mr-1" /> Add Property
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-added-properties" className="dash-menu-navs">
                            <FaClipboardList className="inline mr-1" /> My Added Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/sold-properties" className="dash-menu-navs">
                            <MdSell className="inline mr-1" /> My Sold Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/offered-properties" className="dash-menu-navs">
                            <BiSolidOffer className="inline mr-1" /> Offered Properties
                        </NavLink>
                    </li>
                </>
            )}

            {/* For admins only */}
            {role === 'admin' && (
                <>
                    <li>
                        <NavLink to="/dashboard/manage-all-properties" className="dash-menu-navs">
                            <MdManageHistory className="inline mr-1" /> Manage Properties
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-users" className="dash-menu-navs">
                            <MdPeople className="inline mr-1" /> Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manage-reviews" className="dash-menu-navs">
                            <MdRateReview className="inline mr-1" /> Manage Reviews
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    );
};

export default DashboardMenu;
