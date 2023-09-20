import { IPlayer } from "@models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const PlayersApiActions = createActionGroup({
    source: 'Players API',
    events: {
        'Players Load': emptyProps(),
        'Players Load Success': props<{ players: IPlayer[] }>()
    }
})

export const PlayersActions = createActionGroup({
    source: 'Players',
    events: {
        'Players Filter By Name': props<{ search: string }>(),
        'Players Filter By Position': props<{ position: string }>()
    }
})