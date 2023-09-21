import { ComponentType } from "@angular/cdk/overlay";
import { MatDialogConfig } from "@angular/material/dialog";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const DialogActions = createActionGroup({
    source: 'Dialog',
    events: {
        'Dialog Open': props<{ component: ComponentType<unknown>, config: MatDialogConfig }>(),
        'Dialog Close': emptyProps(),
        'Dialog Save': props<{ dialogResult?: unknown }>(),
    }
})