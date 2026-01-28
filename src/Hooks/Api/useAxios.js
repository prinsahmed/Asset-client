import axios from "axios";





const api = axios.create({
    baseURL:'http://localhost:2500'
})

export const useAxios = () => {
    
        api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');

                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

  
    return api;
}