import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TimeSeriesApi } from '../api';
import { TimeSeriesResponse } from '../models/timeSeries';
import { RootState } from '../store/store';

export interface AssetState {
    assetTimeSeries: TimeSeriesResponse[];
}

const initialState: AssetState = {
    assetTimeSeries: new Array<TimeSeriesResponse>(),
};

export const fetchAssetTimeSeriesByKey = createAsyncThunk(
    'asset/fetchAssetTimeSeriesByKey',
    async (key: string) => {
        const response = await TimeSeriesApi.Get(key);

        return response;
    }
);

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAssetTimeSeriesByKey.fulfilled, (state, action) => {
            const key = action.meta.arg;
            const newTimeSeries = [...state.assetTimeSeries].filter((e) => e.key != key);

            newTimeSeries.push({ key: key, points: action.payload });

            state.assetTimeSeries = newTimeSeries;
        });
        builder.addCase(fetchAssetTimeSeriesByKey.rejected, (state, action) => {
            const key = action.meta.arg;
            const newTimeSeries = [...state.assetTimeSeries].filter((e) => e.key != key);

            state.assetTimeSeries = newTimeSeries;
        });
    },
});

export const selectAssetTimeSeries = (state: RootState): TimeSeriesResponse[] => state.asset.assetTimeSeries;

export default assetSlice.reducer;
