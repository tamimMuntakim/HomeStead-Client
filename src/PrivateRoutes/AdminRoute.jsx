import React from "react";
import useUserRole from "../Hooks/useUserRole";
import Loader from "../Components/Loader";
import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, isLoading } = useUserRole(user?.email);
    
    if (loading || isLoading) {
        return <Loader></Loader>;
    }

    if (!user || role != "admin") {
        return <Navigate state={location.pathname} to={"/forbidden"}></Navigate>
    }
    return <div>{children}</div>;
};

export default AdminRoute;