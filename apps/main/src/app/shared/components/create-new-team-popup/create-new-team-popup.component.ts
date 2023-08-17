import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDialogRef } from '@angular/material/dialog';
import { Actions } from '@ngneat/effects-ng';
import { Observable, takeUntil } from 'rxjs';

import { AppRepository, IStoreData, createUserTeam } from 'src/app/store';
import { IUserTeam } from '../../models/user-team.model';
import { BaseComponent } from '../base';
import { AuthService } from 'src/app/services';
import { IUser } from '../../models/user.model';
@Component({
  selector: 'app-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateNewTeamPopupComponent extends BaseComponent implements OnInit {
  newUserTeamForm!: FormGroup;
  userTeam$: Observable<IStoreData<IUserTeam> | null> = this._appRepository.userTeam$;
  errorMessage!: string;

  get currentUser(): IUser | null {
    return this._authService.getCurrentUser();
  }

  constructor(
    private _appRepository: AppRepository,
    private _actions: Actions,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<CreateNewTeamPopupComponent>,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.newUserTeamForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    })

    this.userTeam$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        if (res?.error) {
          this.errorMessage = res.error;
        }

        if (res?.data && this.currentUser) {
          this._authService.setCurrentUser({...this.currentUser, teamId: res?.data.id });
          this._dialogRef.close(res?.data);
        }
      }
    )
  }

  createTeam(): void {
    const formValue = this.newUserTeamForm.getRawValue();

    if (!formValue.name) {
      this.errorMessage = "Team Name is required.";
    }
  
    this._actions.dispatch(createUserTeam(formValue.name));
  }

  onClosePopup() {
    this._dialogRef.close();
  }
}