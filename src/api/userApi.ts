import axios from "axios";
import { ApiBaseRoutes } from "../models/app/apiBaseRoutes";
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, RegisterRequest, RegisterResponse, UpdateThemeRequest, UpdateUserRequest, User } from "../models/user";
import { GetInvestagerConfigWithBearer } from "./requestConfigs";

export async function Get(): Promise<User> {
    const response = await axios.get<User>(ApiBaseRoutes.user, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Register(request: RegisterRequest): Promise<RegisterResponse> {
    const response = await axios.post<RegisterResponse>(ApiBaseRoutes.user, request, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Login(request: LoginRequest): Promise<LoginResponse> {
    const response = await axios.put<LoginResponse>(`${ApiBaseRoutes.user}/login`, request, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function RefreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await axios.put<LoginResponse>(`${ApiBaseRoutes.user}/refreshtoken`, request, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Update(request: UpdateUserRequest): Promise<void> {
    await axios.put(`${ApiBaseRoutes.user}`, request, GetInvestagerConfigWithBearer());
}

export async function UpdateTheme(request: UpdateThemeRequest): Promise<void> {
    await axios.put(`${ApiBaseRoutes.user}/theme`, request, GetInvestagerConfigWithBearer());
}

export async function Delete(): Promise<void> {
    await axios.delete(ApiBaseRoutes.user, GetInvestagerConfigWithBearer());
}
