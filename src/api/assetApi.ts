import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import { AssetSearchResponse } from '../models/asset';
import axiosClient from './axiosClient';

export async function Search(searchText: string): Promise<AssetSearchResponse> {
    const response = await axiosClient.get<AssetSearchResponse>(`${ApiBaseRoutes.asset}/search/${searchText}?max=10`);

    return response.data;
}
