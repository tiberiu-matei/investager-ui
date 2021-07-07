import axios from "axios";
import { ApiBaseRoutes } from "../models/app/apiBaseRoutes";
import { AssetSummary, StarAssetRequest } from "../models/asset";
import { GetInvestagerConfigWithBearer } from "./requestConfigs";

export async function GetAll(): Promise<AssetSummary[]> {
    const response = await axios.get<AssetSummary[]>(`${ApiBaseRoutes.asset}/all`, GetInvestagerConfigWithBearer());

    return response.data;
}

export async function Star(request: StarAssetRequest): Promise<void> {
    await axios.post(`${ApiBaseRoutes.asset}/star`, request, GetInvestagerConfigWithBearer());
}

export async function Unstar(assetId: number): Promise<void> {
    await axios.delete(`${ApiBaseRoutes.asset}/${assetId}/unstar`, GetInvestagerConfigWithBearer());
}
