import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddProperty from "../Pages/AddProperty";
import MyProfile from "../Layouts/MyProfile";
import MyAddedProperties from "../Pages/MyAddedProperties";
import UpdatePropertyDetails from "../Pages/UpdatePropertyDetails";
import ManageProperties from "../Pages/ManageProperties";
import PropertyDetails from "../Pages/PropertyDetails";
import MyWishlist from "../Pages/MyWishlist";
import PropertiesBought from "../Pages/PropertiesBought";
import MyReviews from "../Pages/MyReviews";
import MakeOffer from "../Pages/MakeOffer";
import AllProperties from "../Pages/AllProperties";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <HomeLayout></HomeLayout>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>,
                },
                {
                    path: "/property-details/:id",
                    element: <PropertyDetails></PropertyDetails>,
                },
                {
                    path: "/all-properties",
                    element: <AllProperties></AllProperties>
                },
            ]
        },
        {
            path: "/dashboard",
            element: <DashboardLayout></DashboardLayout>,
            children: [
                {
                    index: true,
                    element: <MyProfile></MyProfile>,
                },
                {
                    path: "/dashboard/my-wishlist",
                    element: <MyWishlist></MyWishlist>,
                },
                {
                    path: "/dashboard/make-offer/:id",
                    element: <MakeOffer></MakeOffer>,
                },
                {
                    path: "/dashboard/properties-bought",
                    element: <PropertiesBought></PropertiesBought>,
                },
                {
                    path: "/dashboard/my-reviews",
                    element: <MyReviews></MyReviews>,
                },
                {
                    path: "/dashboard/add-property",
                    element: <AddProperty></AddProperty>,
                },
                {
                    path: "/dashboard/my-added-properties",
                    element: <MyAddedProperties></MyAddedProperties>,
                },
                {
                    path: "/dashboard/update-property-details/:id",
                    element: <UpdatePropertyDetails></UpdatePropertyDetails>
                },
                {
                    path: "/dashboard/manage-all-properties",
                    element: <ManageProperties></ManageProperties>,
                },
            ]
        },
        {
            path: "/auth",
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: "/auth/login",
                    element: <Login></Login>,
                },
                {
                    path: "/auth/register",
                    element: <Register></Register>,
                },
            ]
        },
        {
            path: "/*",
            element: <ErrorPage></ErrorPage>,
        },
    ]
)

export default router;