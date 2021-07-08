import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetApi } from '../api';
import { LocalStorageKeys } from '../models/app/localStorageKeys';
import { ThemeName, UserStarredAsset } from '../models/user';
import { RootState } from '../store/store';

export interface UserState {
    displayName: string;
    logged: boolean | null;
    theme: ThemeName;
    starredAssets: UserStarredAsset[] | undefined;
}

const initialState: UserState = {
    displayName: localStorage.getItem(LocalStorageKeys.displayName) ?? '',
    logged: localStorage.getItem(LocalStorageKeys.refreshToken) !== null,
    theme: <ThemeName>(localStorage.getItem(LocalStorageKeys.theme) ?? 'None'),
    starredAssets: undefined,
};

export const fetchUserStarredAssets = createAsyncThunk('user/fetchStarredAssets', async () => {
    const response = await AssetApi.GetStarred();

    return response;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (
            state,
            action: PayloadAction<{
                displayName: string;
                logged: boolean;
            }>
        ) => {
            const { displayName, logged } = action.payload;
            state.displayName = displayName;
            state.logged = logged;
        },
        setUserTheme: (state, action: PayloadAction<ThemeName>) => {
            state.theme = action.payload;
        },
        starAsset: (state, action: PayloadAction<UserStarredAsset>) => {
            state.starredAssets = state.starredAssets ? [...state.starredAssets, action.payload] : [action.payload];
        },
        unstarAsset: (state, action: PayloadAction<number>) => {
            if (state.starredAssets) {
                state.starredAssets = [...state.starredAssets].filter((e) => e.assetId !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserStarredAssets.fulfilled, (state, action) => {
            state.starredAssets = action.payload;
        });
        builder.addCase(fetchUserStarredAssets.rejected, (state) => {
            state.starredAssets = undefined;
        });
    },
});

export const { setUserDetails, setUserTheme, starAsset, unstarAsset } = userSlice.actions;

export const selectUserLogged = (state: RootState): boolean | null => state.user.logged;

export const selectUserTheme = (state: RootState): ThemeName => state.user.theme;

export const selectUserStarredAssets = (state: RootState): UserStarredAsset[] | undefined => state.user.starredAssets;

export default userSlice.reducer;
