import axios from "axios";
import { useEffect } from "react";




const api = axios.create({
    baseURL:'http://localhost:2500'
})

export const useAxios = () => {
    useEffect(() => {
        api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

    }, [])
    return api;
}