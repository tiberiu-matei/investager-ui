import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
    UpdateThemeRequest,
    UpdateUserRequest,
    User
} from '../models/user';
import axiosClient from './axiosClient';

export async function Get(): Promise<User> {
    const response = await axiosClient.get<User>(ApiBaseRoutes.user);

    return response.data;
}

export async function Register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosClient.post<RegisterResponse>(ApiBaseRoutes.user, request);

    return response.data;
}

export async function Login(request: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.put<LoginResponse>(`${ApiBaseRoutes.user}/login`, request);

    return response.data;
}

export async function RefreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await axiosClient.put<LoginResponse>(`${ApiBaseRoutes.user}/refreshtoken`, request);

    return response.data;
}

export async function Update(request: UpdateUserRequest): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.user}`, request);
}

export async function UpdateTheme(request: UpdateThemeRequest): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.user}/theme`, request);
}

export async function Delete(): Promise<void> {
    await axiosClient.delete(ApiBaseRoutes.user);
}
