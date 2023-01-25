import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    method: 'post',
    timeout: 5000
});

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export { instance };
