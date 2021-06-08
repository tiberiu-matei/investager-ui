import { AxiosRequestConfig } from "axios";
import { LocalStorageKeys } from "../models/localStorageKeys";

export function GetInvestagerConfigWithBearer(): AxiosRequestConfig {
    const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config: AxiosRequestConfig = {
        baseURL: apiUrl,
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    return config;
}
