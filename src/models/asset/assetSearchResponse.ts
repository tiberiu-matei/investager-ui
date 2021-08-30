import { AssetSummary } from './assetSummary';

export interface AssetSearchResponse {
    assets: AssetSummary[];
    moreRecordsAvailable: boolean;
}
