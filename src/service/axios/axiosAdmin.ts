import axios from "axios";

export const axiosAdmin=()=>{
    const axiosAdmin=axios.create({
        baseURL:"http://localhost:3000/api/admin",
        headers:{
            "Content-Type":"application/json"
        }
    });
    axiosAdmin.interceptors.request.use(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (config: any) => {
            const token = localStorage.getItem('adminToken')
            return {
                ...config,
                headers: {
                    ...(token !== null && { Authorization: `Bearer ${token}` }),
                    ...config.headers,
                },
            };
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
            return Promise.reject(error);
        }
    );

    axiosAdmin.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosAdmin
}

