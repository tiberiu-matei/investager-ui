import axios from "axios";
import { ApiBaseRoutes } from "../models/apiBaseRoutes";
import { Portfolio, UpdatePortfolioRequest } from "../models/portfolio";
import { GetInvestagerConfigWithBearer } from "./requestConfigs";

export async function Get(portfolioId: number): Promise<Portfolio> {
    const response = await axios.get<Portfolio>(`${ApiBaseRoutes.portfolio}/${portfolioId}`, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function GetAll(): Promise<Portfolio[]> {
    const response = await axios.get<Portfolio[]>(ApiBaseRoutes.portfolio, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Create(request: UpdatePortfolioRequest): Promise<Portfolio> {
    const response = await axios.post<Portfolio>(ApiBaseRoutes.portfolio, request, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Update(portfolioId: number, request: UpdatePortfolioRequest): Promise<void> {
    await axios.put(`${ApiBaseRoutes.portfolio}/${portfolioId}`, request, GetInvestagerConfigWithBearer());
}

export async function Delete(portfolioId: number): Promise<void> {
    await axios.delete(`${ApiBaseRoutes.portfolio}/${portfolioId}`, GetInvestagerConfigWithBearer());
}
