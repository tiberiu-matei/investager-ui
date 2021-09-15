import { ApiBaseRoutes } from '../models/app/apiBaseRoutes';
import { TimePointResponse } from '../models/timeSeries';
import axiosClient from './axiosClient';

export async function Get(key: string): Promise<TimePointResponse[]> {
    const response = await axiosClient.get<TimePointResponse[]>(`${ApiBaseRoutes.timeSeries}/${key}`);

    return response.data;
}
