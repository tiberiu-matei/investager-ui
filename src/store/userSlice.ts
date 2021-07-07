import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKeys } from '../models/app/localStorageKeys';
import { ThemeName } from '../models/user';
import { RootState } from '../store/store';

export interface UserState {
    displayName: string;
    logged: boolean | null;
    theme: ThemeName;
}

const initialState: UserState = {
    displayName: localStorage.getItem(LocalStorageKeys.displayName) ?? '',
    logged: localStorage.getItem(LocalStorageKeys.refreshToken) !== null,
    theme: <ThemeName>(localStorage.getItem(LocalStorageKeys.theme) ?? 'None'),
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<{ displayName: string, logged: boolean }>) => {
            const { displayName, logged } = action.payload;
            state.displayName = displayName;
            state.logged = logged;
        },
        setUserTheme: (state, action: PayloadAction<ThemeName>) => {
            state.theme = action.payload;
        }
    },
});

export const { setUserDetails, setUserTheme } = userSlice.actions;

export const selectUserLogged = (state: RootState): boolean | null => state.user.logged;

export const selectUserTheme = (state: RootState): ThemeName => state.user.theme;

export default userSlice.reducer;
