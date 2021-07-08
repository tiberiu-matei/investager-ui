import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import { Portfolio, UpdatePortfolioRequest } from '../models/portfolio';
import axiosClient from './axiosClient';

export async function Get(portfolioId: number): Promise<Portfolio> {
    const response = await axiosClient.get<Portfolio>(`${ApiBaseRoutes.portfolio}/${portfolioId}`);

    return response.data;
}

export async function GetAll(): Promise<Portfolio[]> {
    const response = await axiosClient.get<Portfolio[]>(ApiBaseRoutes.portfolio);

    return response.data;
}

export async function Create(request: UpdatePortfolioRequest): Promise<Portfolio> {
    const response = await axiosClient.post<Portfolio>(ApiBaseRoutes.portfolio, request);

    return response.data;
}

export async function Update(portfolioId: number, request: UpdatePortfolioRequest): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.portfolio}/${portfolioId}`, request);
}

export async function Delete(portfolioId: number): Promise<void> {
    await axiosClient.delete(`${ApiBaseRoutes.portfolio}/${portfolioId}`);
}
