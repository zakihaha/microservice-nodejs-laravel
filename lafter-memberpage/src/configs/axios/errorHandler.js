import { toast } from 'react-toastify';
import users from 'constants/api/users';

import axios, { setAuthorizationHeader } from './index'

export default function errorHandler(error) {
    if (error) {
        let message;
        if (error.response) {
            const originalRequest = error.config;
            console.log('config', error.config._retry);
            
            if (error.response.status == 500) message = "Internal Server Error";
            else if (error.response.status == 401) message = "Unauthorized";
            
            else if (error.response.status == 403 && !originalRequest._retry) {
                originalRequest._retry = true;
                console.log('config', error.config._retry);
                const session = localStorage['lafter:token'] ? JSON.parse(localStorage['lafter:token']) : null;
                return users.refresh({ refresh_token: session.refreshToken, email: session.email }).then(res => {
                    if (res.data) {
                        setAuthorizationHeader(res.data.token)
                        localStorage.setItem('lafter:token', JSON.stringify({
                            ...session,
                            token: res.data.token
                        }))

                        originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`

                        // kembali ke alur request sebelumnya
                        return axios(originalRequest);
                    } else {
                        window.location.href = '/login'
                        localStorage.removeItem('lafter:token')
                    }
                }).catch(err => {
                    console.log(err);
                    return Promise.reject(err);
                })
            }

            else if (error.response.status == 404) message = "Not Found";
            else message = error.response.data;

            if (typeof message === "string") toast.error(message);

            return Promise.reject(error);
        }
    }
}