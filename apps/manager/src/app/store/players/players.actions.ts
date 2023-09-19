import { IPlayer } from "@models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const PlayersApiActions = createActionGroup({
    source: 'Players API',
    events: {
        'Players Load': emptyProps(),
        'Players Load Success': props<{ players: IPlayer[] }>(),
    }
})