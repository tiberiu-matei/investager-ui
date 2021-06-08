import { ThemeName } from "./themeName";

export interface LoginResponse {
    displayName: string;
    theme: ThemeName;
    accessToken: string;
    refreshToken: string;
}
