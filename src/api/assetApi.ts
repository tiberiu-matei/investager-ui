import axios from "axios";
import { ApiBaseRoutes } from "../models/apiBaseRoutes";
import { AssetSummary } from "../models/asset/assetSummary";
import { GetInvestagerConfigWithBearer } from "./requestConfigs";

export async function GetAll(): Promise<AssetSummary[]> {
    const response = await axios.get<AssetSummary[]>(`${ApiBaseRoutes.asset}/all`, GetInvestagerConfigWithBearer());

    return response.data;
}
