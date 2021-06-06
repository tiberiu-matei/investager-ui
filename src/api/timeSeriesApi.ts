import axios from "axios";
import { ApiBaseRoutes } from "../models/apiBaseRoutes";
import { TimeSeries } from "../models/timeSeries";
import { GetInvestagerConfigWithBearer } from "./requestConfigs";

export async function Get(key: string): Promise<TimeSeries> {
    const response = await axios.get<TimeSeries>(`${ApiBaseRoutes.timeSeries}/${key}`, GetInvestagerConfigWithBearer());

    return response.data;
}
