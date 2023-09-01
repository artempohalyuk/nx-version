import { IPlayer, IUserTeam } from "@models";
import { createAction, props } from "@ngrx/store";

export const loadUserTeam = createAction('[Team] Load');

export const loadUserTeamSuccess = createAction(
    `${loadUserTeam.type} Success`,
    props<{
        userTeam: IUserTeam;
    }>()
);

export const createUserTeam = createAction(
    '[Team] Create Team',
    props<{
        name: string
    }>()
);

export const createUserTeamSuccess = createAction(
    `${createUserTeam.type} Success`,
    props<{
        userTeam: IUserTeam;
    }>()
);

export const createUserTeamFailure = createAction(
    `${createUserTeam.type} Failure`,
    props<{
        error: string | undefined;
    }>()
);

export const updateUserTeamSuccess = createAction(
    '[Team] Update Success',
    props<{
        userTeam: IUserTeam;
    }>()
);

export const removeUserTeam = createAction('[Team] Remove Team');

export const removeUserTeamSuccess = createAction(
    `${removeUserTeam.type} Success`,
    props<{
        status: boolean;
    }>()
);

export const addPlayerToUserTeam = createAction(
    '[Team] Add Player',
    props<{
        userTeam: IUserTeam;
    }>()
);

export const removePlayerFromUserTeam = createAction(
    '[Team] Remove Player',
    props<{
        userTeam: IUserTeam;
    }>()
);