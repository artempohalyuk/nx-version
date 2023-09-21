import { IUser } from "@nx/shared/types";

export interface IAuthState {
    user: IUser | null;
    isLoading: boolean | null;
}