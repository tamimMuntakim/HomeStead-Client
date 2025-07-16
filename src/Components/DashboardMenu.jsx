import React from 'react';
import "./DashMenu.css";
import { NavLink } from 'react-router';

const DashboardMenu = () => {
    return (
        <ul className="menu w-full text-center md:space-y-2">
            <li><NavLink to="/dashboard" className="dash-menu-navs" end>My Profile</NavLink></li>
            <li><NavLink to="/dashboard/add-property" className="dash-menu-navs">Add Property</NavLink></li>
            <li><NavLink to="/dashboard/my-added-properties" className="dash-menu-navs">My Added Properties</NavLink></li>
        </ul>
    );
};

export default DashboardMenu;