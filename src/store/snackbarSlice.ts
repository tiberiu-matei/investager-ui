import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface SnackbarState {
    text: string;
    severity: 'success' | 'info' | 'warning' | 'error';
}

const initialState: SnackbarState = {
    text: "",
    severity: 'info',
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackbar: (state, action: PayloadAction<SnackbarState>) => {
            return action.payload;
        },
    },
});

export const { setSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) : SnackbarState => state.snackbar;

export default snackbarSlice.reducer;
