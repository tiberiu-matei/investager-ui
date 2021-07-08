import { TimePointResponse } from './timePointResponse';

export interface TimeSeriesResponse {
    key: string;
    points: TimePointResponse[];
}
