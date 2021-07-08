import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import { TimeSeriesResponse } from '../models/timeSeries';
import axiosClient from './axiosClient';

export async function Get(key: string): Promise<TimeSeriesResponse> {
    const response = await axiosClient.get<TimeSeriesResponse>(`${ApiBaseRoutes.timeSeries}/${key}`);

    return response.data;
}
