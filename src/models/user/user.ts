import { ThemeName } from "./themeName";
import { UserStarredAsset } from "./userStarredAsset";

export interface User {
    email: string;
    displayName: string;
    theme: ThemeName;
    starredAssets: UserStarredAsset[];
}
