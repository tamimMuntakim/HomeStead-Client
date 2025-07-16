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
                    path: "/dashboard/add-property",
                    element: <AddProperty></AddProperty>,
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