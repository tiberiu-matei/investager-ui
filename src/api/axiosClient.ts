import axios from 'axios';
import { UserApi } from '.';
import { LocalStorageKeys } from '../models/app';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

let accessToken = localStorage.getItem(LocalStorageKeys.accessToken);

export const updateAxiosAccessToken = (newAccessToken: string): void => {
    accessToken = newAccessToken;
};

let refreshPromise: Promise<void> | undefined;
let refreshPromiseResolve: (value: void | PromiseLike<void>) => void;
let refreshing = false;

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            if (!refreshing) {
                refreshing = true;
                refreshPromise = new Promise((resolve) => {
                    refreshPromiseResolve = resolve;
                });

                const refreshToken = localStorage.getItem(LocalStorageKeys.refreshToken);

                const refreshResponse = await UserApi.RefreshToken({ refreshToken: refreshToken ?? '' });

                localStorage.setItem(LocalStorageKeys.accessToken, refreshResponse.accessToken);

                updateAxiosAccessToken(refreshResponse.accessToken);

                refreshPromiseResolve();
                refreshing = false;
            } else {
                await refreshPromise;
            }

            return instance.request(error.config);
        }

        return Promise.reject(error);
    }
);

console.log('execut me please god');

export default instance;
