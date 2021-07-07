
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetSummary } from '../models/asset';
import { TimeSeries } from '../models/timeSeries';
import { RootState } from '../store/store';

export interface AssetState {
    assetSummaries: AssetSummary[];
    assetTimeSeries: TimeSeries[];
}

const initialState: AssetState = {
    assetSummaries: new Array<AssetSummary>(),
    assetTimeSeries: new Array<TimeSeries>(),
};

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {
        setAssetSummaries: (state, action: PayloadAction<AssetSummary[]>) => {
            state.assetSummaries = action.payload;
        },
        setAssetTimeSeries: (state, action: PayloadAction<TimeSeries>) => {
            state.assetSummaries = action.payload;
        },
    },
});

export const { setAssetSummaries, setAssetTimeSeries } = assetSlice.actions;

export const selectAssetSummaries = (state: RootState): AssetState => state.;

export default assetSlice.reducer;
