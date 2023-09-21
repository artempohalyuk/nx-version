import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DialogActions } from "./dialog.actions";
import { tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

const openDialog = createEffect((
    actions$ = inject(Actions),
    dialog = inject(MatDialog)
) => 
    actions$.pipe(
        ofType(DialogActions.dialogOpen),
        tap(
            ({ component, config }) => dialog.open(component, config)
        )
    ),
    { functional: true, dispatch: false }
)

export const DialogEffects = {
    openDialog
}