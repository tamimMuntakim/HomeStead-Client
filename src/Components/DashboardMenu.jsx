import React from 'react';
import "./DashMenu.css";
import { NavLink } from 'react-router';

const DashboardMenu = () => {
    return (
        <ul className="menu w-full text-center md:space-y-2">
            <li><NavLink to="/dashboard" className="dash-menu-navs" end>My Profile</NavLink></li>
            <li><NavLink to="/dashboard/my-wishlist" className="dash-menu-navs">My Wishlist</NavLink></li>
            <li><NavLink to="/dashboard/properties-bought" className="dash-menu-navs">Properties Bought</NavLink></li>
            <li><NavLink to="/dashboard/my-reviews" className="dash-menu-navs">My Reviews</NavLink></li>
            <li><NavLink to="/dashboard/add-property" className="dash-menu-navs">Add Property</NavLink></li>
            <li><NavLink to="/dashboard/my-added-properties" className="dash-menu-navs">My Added Properties</NavLink></li>
            <li><NavLink to="/dashboard/manage-all-properties" className="dash-menu-navs">Manage Properties</NavLink></li>
        </ul>
    );
};

export default DashboardMenu;