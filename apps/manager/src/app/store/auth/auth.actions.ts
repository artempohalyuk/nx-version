import { IUser } from "@models";
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
    source: 'Auth API',
    events: {
        'User Logout': props<{ user: null }>(),
    }
})