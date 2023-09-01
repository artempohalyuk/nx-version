import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { Observable, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import * as userTeamActions from '@store/user-team';
import { BaseComponent } from '../base';

@Component({
  selector: 'nx-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateNewTeamPopupComponent extends BaseComponent implements OnInit {
  newUserTeamForm!: FormGroup;
  errorMessage$: Observable<string | undefined> = this._store.select(userTeamActions.selectUserTeamErrors);
  errorMessage!: string | undefined;

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

    this._store.select(userTeamActions.selectUserTeam)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (userTeam) => {
          if (userTeam) {
            this._dialogRef.close(userTeam);
          }
      } 
    )

    this._store.select(userTeamActions.selectUserTeamErrors)
      .pipe(
        takeUntil(this.destroy$)
    ).subscribe((error) => this.errorMessage = error)
  }

  createTeam(): void {
    const formValue = this.newUserTeamForm.value;

    if (!this.newUserTeamForm.valid) {
      this.errorMessage = "Team Name is required.";
      return;
    }
  
    this._store.dispatch(userTeamActions.createUserTeam({name: formValue.name}));
  }

  onClosePopup() {
    this._dialogRef.close();
  }
}