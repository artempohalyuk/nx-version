import { IUser } from "@nx/shared/types";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const AuthApiActions = createActionGroup({
    source: 'Auth API',
    events: {
        'User Load': emptyProps(),
        'User Load Success': props<{ user: IUser }>(),
        'User Load Failure': props<{ error: string | undefined }>(),
    }
})

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'User Logout': props<{ user: null }>(),
    }
})