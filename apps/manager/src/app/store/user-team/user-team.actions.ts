import { IPlayer, IUserTeam } from "@models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const UserTeamApiActions = createActionGroup({
    source: 'User Team API',
    events: {
        'User Team Load': emptyProps(),
        'User Team Load Success': props<{ userTeam: IUserTeam }>(),
        'User Team Create': props<{ name: string }>(),
        'User Team Create Success': props<{ userTeam: IUserTeam }>(),
        'User Team Create Failure': props<{ error: string | undefined }>(),
        'User Team Update Success': props<{ userTeam: IUserTeam }>(),
        'User Team Remove': emptyProps(),
        'User Team Remove Success': props<{ status: boolean }>(),
    }
})

export const UserTeamActions = createActionGroup({
    source: 'User Team',
    events: {
        'User Team Add Player': props<{ player: IPlayer }>(),
        'User Team Remove Player': props<{ player: IPlayer }>(),
    }
})