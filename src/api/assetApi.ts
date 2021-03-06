import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import { AssetSearchResponse, StarAssetRequest } from '../models/asset';
import { UserStarredAsset } from '../models/user';
import axiosClient from './axiosClient';

export async function Search(searchText: string): Promise<AssetSearchResponse> {
    const response = await axiosClient.get<AssetSearchResponse>(`${ApiBaseRoutes.asset}/search/${searchText}?max=10`);

    return response.data;
}

export async function GetStarred(): Promise<UserStarredAsset[]> {
    const response = await axiosClient.get<UserStarredAsset[]>(`${ApiBaseRoutes.asset}/starred`);

    return response.data;
}

export async function Star(request: StarAssetRequest): Promise<void> {
    await axiosClient.post(`${ApiBaseRoutes.asset}/star`, request);
}

export async function UpdateStarDisplayOrder(request: UserStarredAsset): Promise<void> {
    await axiosClient.put(`${ApiBaseRoutes.asset}/stardisplayorder`, request);
}

export async function Unstar(assetId: number): Promise<void> {
    await axiosClient.delete(`${ApiBaseRoutes.asset}/${assetId}/unstar`);
}
