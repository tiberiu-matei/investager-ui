import { GainLoss } from '../timeSeries';

export interface WatchedAsset {
    assetId: number;
    symbol: string;
    exchange: string;
    key: string;
    name: string;
    industry: string;
    currency: string;
    displayOrder: number;
    gainLoss: GainLoss;
}
