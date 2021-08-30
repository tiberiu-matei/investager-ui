import { AssetGainLoss } from "../asset";

export interface UserStarredAsset {
    assetId: number;
    symbol: string;
    exchange: string;
    key: string;
    name: string;
    industry: string;
    currency: string;
    displayOrder: number;
    gainLoss: AssetGainLoss;
}
