import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { Observable, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { BaseComponent } from '@nx/shared/components';
import { UserTeamApiActions, userTeamFeature } from '@store/user-team';

@Component({
  selector: 'nx-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateNewTeamPopupComponent extends BaseComponent implements OnInit {
  newUserTeamForm!: FormGroup;
  errorMessage$: Observable<string | undefined> = this._store.select(userTeamFeature.selectError);

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<CreateNewTeamPopupComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.newUserTeamForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });

    this._store.select(userTeamFeature.selectUserTeam)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (userTeam) => {
          if (userTeam) {
            this._dialogRef.close(userTeam);
          }
      } 
    )
  }

  createTeam(): void {
    const formValue = this.newUserTeamForm.value;

    if (!this.newUserTeamForm.valid) {
      this._store.dispatch(UserTeamApiActions.userTeamCreateFailure({ error: "Team Name is required."}))
      return;
    }
  
    this._store.dispatch(UserTeamApiActions.userTeamCreate({name: formValue.name}));
  }

  onClosePopup() {
    this._dialogRef.close();
  }
}