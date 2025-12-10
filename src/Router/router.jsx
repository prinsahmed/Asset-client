import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AuthHR from "../Components/Authentication/AuthHR";
import ForgotPass from "../Components/Authentication/ForgotPass";
import UserLogin from "../Components/Authentication/UserLogin";
import AuthEmployee from "../Components/Authentication/AuthEmployee"
import HomePage from "../Pages/Homepage";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
               index:true,
               Component:HomePage
                
            }
        ]
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
                path:'login',
                Component:UserLogin
            },
            {
                path:'forget-pass',
                Component:ForgotPass
            }
        ]
    }
])