import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface UserState {
    displayName: string;
    logged: boolean | null;
}

const initialState: UserState = { displayName: '', logged: null };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<{ displayName: string, logged: boolean }>) => {
            const { displayName, logged } = action.payload;
            state.displayName = displayName;
            state.logged = logged;
        },
    },
});

export const { setUserDetails } = userSlice.actions;

export const selectUserLogged = (state: RootState): boolean | null => state.user.logged;

export default userSlice.reducer;
