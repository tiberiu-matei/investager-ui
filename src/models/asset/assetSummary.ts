import { AssetGainLoss } from "./assetGainLoss";

export interface AssetSummary {
    id: number;
    symbol: string;
    exchange: string;
    key: string;
    name: string;
    industry: string;
    currency: string;
    gainLoss: AssetGainLoss;
}
