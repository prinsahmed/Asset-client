import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AuthEmployee from "../Components/Authentication/AuthEmployee";
import AuthHR from "../Components/Authentication/AuthHR";
import ForgotPass from "../Components/Authentication/ForgotPass";


export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout
    },
    {
        path:'auth',
        Component:AuthLayout,
        children:[
            {
                path:'employee-registration',
                Component:AuthEmployee
            },
            {
                path:'HR-registration',
                Component:AuthHR
            },
            {
                path:'forget-pass',
                Component:ForgotPass
            }
        ]
    }
])