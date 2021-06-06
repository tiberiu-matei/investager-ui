import { AxiosRequestConfig } from "axios";
import { LocalStorageKeys } from "../models/localStorageKeys";

export function GetInvestagerConfigWithBearer(): AxiosRequestConfig {
    const accessToken = localStorage.getItem(LocalStorageKeys.accessToken);
    const config: AxiosRequestConfig = {
        baseURL: "http://localhost:8022/api/",
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    return config;
}
