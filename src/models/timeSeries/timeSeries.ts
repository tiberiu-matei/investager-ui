import { TimePoint } from "./timePoint";

export interface TimeSeries {
    key: string;
    points: TimePoint[];
}
