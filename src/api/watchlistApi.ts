import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import {
    UnwatchAssetRequest,
    UnwatchCurrencyPairRequest,
    WatchAssetRequest,
    WatchCurrencyPairRequest,
    Watchlist,
    WatchlistLight
} from '../models/watchlist';
import axiosClient from './axiosClient';

export async function GetWatchlists(): Promise<WatchlistLight[]> {
    const response = await axiosClient.get<WatchlistLight[]>(`${ApiBaseRoutes.watchlist}/all`);

    return response.data;
}

export async function Get(id: number): Promise<Watchlist> {
    const response = await axiosClient.get<Watchlist>(`${ApiBaseRoutes.watchlist}/${id}`);

    return response.data;
}

export async function WatchAsset(request: WatchAssetRequest): Promise<void> {
    await axiosClient.post(
        `${ApiBaseRoutes.watchlist}/${request.watchlistId}/asset/${request.assetId}/watch`,
        { displayOrder: request.displayOrder }
    );
}

export async function WatchCurrencyPair(request: WatchCurrencyPairRequest): Promise<void> {
    await axiosClient.post(
        `${ApiBaseRoutes.watchlist}/${request.watchlistId}/currencypair/${request.firstCurrencyId}/${request.secondCurrencyId}/watch`,
        { displayOrder: request.displayOrder }
    );
}

export async function UpdateDisplayOrder(watchlistId: number, displayOrder: number): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.watchlist}/${watchlistId}/displayorder`, {
        displayOrder,
    });
}

export async function UpdateName(watchlistId: number, name: string): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.watchlist}/${watchlistId}/name`, { name });
}

export async function UnwatchAsset(request: UnwatchAssetRequest): Promise<void> {
    await axiosClient.delete(
        `${ApiBaseRoutes.watchlist}/${request.watchlistId}/asset/${request.assetId}/unwatch`
    );
}

export async function UnwatchCurrencyPair(request: UnwatchCurrencyPairRequest): Promise<void> {
    await axiosClient.delete(
        `${ApiBaseRoutes.watchlist}/${request.watchlistId}/currencypair/${request.firstCurrencyId}/${request.secondCurrencyId}/unwatch`
    );
}

export async function Delete(watchlistId: number): Promise<void> {
    await axiosClient.delete(`${ApiBaseRoutes.watchlist}/${watchlistId}`);
}
