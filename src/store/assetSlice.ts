import { createAsyncThunk, createSelector, createSlice, OutputSelector } from '@reduxjs/toolkit';
import { TimeSeriesApi } from '../api';
import { TimeSeriesResponse } from '../models/timeSeries';
import { RootState } from '../store/store';
import { SnackbarState } from './snackbarSlice';
import { UserState } from './userSlice';

export interface AssetState {
    assetTimeSeries: TimeSeriesResponse[] | undefined;
}

const initialState: AssetState = {
    assetTimeSeries: undefined,
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
            const newTimeSeries = state.assetTimeSeries
                ? [...state.assetTimeSeries].filter((e) => e.key != action.payload.key)
                : new Array<TimeSeriesResponse>();

            newTimeSeries.push(action.payload);

            state.assetTimeSeries = newTimeSeries;
        });
        builder.addCase(fetchAssetTimeSeriesByKey.rejected, (state, action) => {
            const key = action.meta.arg;
            const newTimeSeries = state.assetTimeSeries
                ? [...state.assetTimeSeries].filter((e) => e.key != key)
                : new Array<TimeSeriesResponse>();

            state.assetTimeSeries = newTimeSeries;
        });
    },
});

const selectAssetTimeSeries = (state: RootState): TimeSeriesResponse[] | undefined =>
    state.asset.assetTimeSeries;

export const createSelectAssetTimeSeriesByKey = (
    key: string
): OutputSelector<
    { snackbar: SnackbarState; user: UserState; asset: AssetState },
    TimeSeriesResponse | undefined,
    (res: TimeSeriesResponse[] | undefined) => TimeSeriesResponse | undefined
> => {
    return createSelector([selectAssetTimeSeries], (timeSeries) => {
        return timeSeries?.find((e) => e.key === key);
    });
};

export default assetSlice.reducer;
