import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import assetReducer from './assetSlice';
import snackbarReducer from './snackbarSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        user: userReducer,
        asset: assetReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
