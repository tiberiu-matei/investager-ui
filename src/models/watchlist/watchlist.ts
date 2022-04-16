import { WatchedAsset } from '.';
import { WatchedCurrencyPair } from './watchedCurrencyPair';

export interface Watchlist {
    id: number;
    assets: WatchedAsset[];
    currencyPairs: WatchedCurrencyPair[];
}
