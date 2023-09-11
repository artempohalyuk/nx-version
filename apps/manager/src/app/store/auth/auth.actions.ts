import { IUser } from "@models";
import { createAction, props } from "@ngrx/store";

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
    `${loadUser.type} Success`,
    props<{
        user: IUser;
    }>()
);

export const loadUserFailure = createAction(
    `${loadUser.type} Failure`,
    props<{
        error: string | undefined;
    }>()
);

export const userLogout = createAction(
    '[Auth] User Logout',
    props<{
        user: null;
    }>()
);