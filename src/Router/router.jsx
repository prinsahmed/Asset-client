import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AuthHR from "../Components/Authentication/AuthHR";
import ForgotPass from "../Components/Authentication/ForgotPass";
import UserLogin from "../Components/Authentication/UserLogin";
import AuthEmployee from "../Components/Authentication/AuthEmployee"
import HomePage from "../Pages/Homepage/HomePage";
import DashboardLayout from "../Layouts/DashboardLayout";
import AssetList from "../Pages/Dashboard/HR/AssetList";
import AddAsset from "../Pages/Dashboard/HR/AddAsset";
import EditAsset from "../Pages/Dashboard/HR/EditAsset";
import AllRequests from "../Pages/Dashboard/HR/AllRequests";
import EmployeeList from "../Pages/Dashboard/HR/EmployeeList";
import EmployeeRequest from "../Pages/Dashboard/HR/EmployeeRequest";
import EmployeeJoin from "../Pages/Dashboard/Employee/EmployeeJoin";
import EmployeeAssets from "../Pages/Dashboard/Employee/EmployeeAssets";
import EmployeeAssetsRequest from "../Pages/Dashboard/Employee/EmployeeAssetsRequest";
import LoginRoute from "../Private route/LoginRoute";
import HRroute from "../Private route/HRroute";
import EmployeeRoute from "../Private route/EmployeeRoute";
import DashBoardIndex from "../Components/Dashboard/DashBoardIndex";




export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: HomePage

            }
        ]
    },
    {
        path: 'auth',
        Component: AuthLayout,
        children: [
            {
                path: 'employee-registration',
                Component: AuthEmployee
            },
            {
                path: 'HR-registration',
                Component: AuthHR
            },
            {
                path: 'login',
                Component: UserLogin
            },
            {
                path: 'forget-pass',
                Component: ForgotPass
            }
        ]
    },
    {
        path: 'dash',
        element: <LoginRoute><DashboardLayout /></LoginRoute>,
        children:
            [{
                index: true,
                element: <DashBoardIndex/>
            },
            {
                path: 'asset-list',
                element: <HRroute><AssetList /></HRroute>
            },
            {
                path: 'add-asset',
                element: <HRroute><AddAsset /></HRroute>
            },
            {
                path: 'edit-asset/:id',
                element: <HRroute><EditAsset /></HRroute>
            },
            {
                path: 'all-request',
                element: <HRroute><AllRequests /></HRroute>
            },
            {
                path: 'my-employee',
                element: <HRroute><EmployeeList /></HRroute>
            },
            {
                path: 'employee-requests',
                element: <HRroute><EmployeeRequest /></HRroute>
            },
            
            // employee dash components
            {                                                            
                path: 'request-asset',
                element: <EmployeeRoute><EmployeeAssetsRequest /></EmployeeRoute>
            },
            {
                path: 'employee-join',
                element: <EmployeeRoute><EmployeeJoin /></EmployeeRoute>
            },
            {
                path: 'employee-asset',
                element: <EmployeeRoute><EmployeeAssets/></EmployeeRoute>
            }
            ]
    }
])