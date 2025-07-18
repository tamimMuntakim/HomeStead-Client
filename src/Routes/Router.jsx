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
import OfferedProperties from "../Pages/OfferedProperties";
import SoldProperties from "../Pages/SoldProperties";
import ManageUsers from "../Pages/ManageUsers";
import ManageReviews from "../Pages/ManageReviews";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import ForbiddenPage from "../Pages/ForbiddenPage";
import UserRoute from "../PrivateRoutes/UserRoute";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AgentRoute from "../PrivateRoutes/AgentRoute";
import Payment from "../Pages/Payment";


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
                    element: <PrivateRoute>
                        <PropertyDetails></PropertyDetails>
                    </PrivateRoute>,
                },
                {
                    path: "/all-properties",
                    element: <PrivateRoute>
                        <AllProperties></AllProperties>
                    </PrivateRoute>,
                },
                {
                    path: "/forbidden",
                    element: <ForbiddenPage></ForbiddenPage>,
                },
            ]
        },
        {
            path: "/dashboard",
            element: <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>,
            children: [
                {
                    index: true,
                    element: <MyProfile></MyProfile>,
                },
                {
                    path: "/dashboard/my-wishlist",
                    element: <UserRoute>
                        <MyWishlist></MyWishlist>
                    </UserRoute>,
                },
                {
                    path: "/dashboard/make-offer/:id",
                    element: <UserRoute>
                        <MakeOffer></MakeOffer>
                    </UserRoute>,
                },
                {
                    path: "/dashboard/properties-bought",
                    element: <UserRoute>
                        <PropertiesBought></PropertiesBought>
                    </UserRoute>,
                },
                {
                    path: "/dashboard/my-reviews",
                    element: <UserRoute>
                        <MyReviews></MyReviews>
                    </UserRoute>,
                },
                {
                    path: "/dashboard/add-property",
                    element: <AgentRoute>
                        <AddProperty></AddProperty>
                    </AgentRoute>,
                },
                {
                    path: "/dashboard/my-added-properties",
                    element: <AgentRoute>
                        <MyAddedProperties></MyAddedProperties>
                    </AgentRoute>,
                },
                {
                    path: "/dashboard/update-property-details/:id",
                    element: <AgentRoute>
                        <UpdatePropertyDetails></UpdatePropertyDetails>
                    </AgentRoute>,
                },
                {
                    path: "/dashboard/sold-properties",
                    element: <AgentRoute>
                        <SoldProperties></SoldProperties>
                    </AgentRoute>,
                },
                {
                    path: "/dashboard/offered-properties",
                    element: <AgentRoute>
                        <OfferedProperties></OfferedProperties>
                    </AgentRoute>,
                },
                {
                    path: "/dashboard/manage-all-properties",
                    element: <AdminRoute>
                        <ManageProperties></ManageProperties>
                    </AdminRoute>,
                },
                {
                    path: "/dashboard/manage-users",
                    element: <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>,
                },
                {
                    path: "/dashboard/manage-reviews",
                    element: <AdminRoute>
                        <ManageReviews></ManageReviews>
                    </AdminRoute>,
                },
                {
                    path: "/dashboard/payment/:offerId",
                    element: <Payment></Payment>,
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