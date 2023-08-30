import { IUser } from "@models";

export interface IAuthState {
    user: IUser | null;
    isLoading: boolean | null;
    // token: string | null;
    // isLoggedIn: boolean | null;
}