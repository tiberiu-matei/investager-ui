import { createAsyncThunk, createSelector, createSlice, OutputSelector } from '@reduxjs/toolkit';
import { AssetApi, TimeSeriesApi } from '../api';
import { AssetSummary } from '../models/asset';
import { TimeSeriesResponse } from '../models/timeSeries';
import { RootState } from '../store/store';
import { SnackbarState } from './snackbarSlice';
import { UserState } from './userSlice';

export interface AssetState {
    assetSummaries: AssetSummary[] | undefined;
    assetTimeSeries: TimeSeriesResponse[] | undefined;
}

const initialState: AssetState = {
    assetSummaries: undefined,
    assetTimeSeries: undefined,
};

export const fetchAssetSummaries = createAsyncThunk('asset/fetchAssetSummaries', async () => {
    const response = await AssetApi.GetAll();

    return response;
});

export const fetchAssetTimeSeriesByKey = createAsyncThunk('asset/fetchAssetTimeSeriesByKey', async (key: string) => {
    const response = await TimeSeriesApi.Get(key);

    return response;
});

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAssetSummaries.fulfilled, (state, action) => {
            state.assetSummaries = action.payload;
        });
        builder.addCase(fetchAssetSummaries.rejected, (state) => {
            state.assetSummaries = undefined;
        });

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

export const selectAssetSummaries = (state: RootState): AssetSummary[] | undefined => state.asset.assetSummaries;

const selectAssetTimeSeries = (state: RootState): TimeSeriesResponse[] | undefined => state.asset.assetTimeSeries;

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
