import { GainLoss } from '../timeSeries';

export interface WatchedCurrencyPair {
    firstCurrencyName: string;
    secondCurrencyName: string;
    key: string;
    displayOrder: number;
    gainLoss: GainLoss;
}
