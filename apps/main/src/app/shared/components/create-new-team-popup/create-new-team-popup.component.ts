import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  selector: 'nx-create-new-team-popup',
  templateUrl: './create-new-team-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // pretty sure that we don't need two form modules here
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreateNewTeamPopupComponent
  extends BaseComponent
  implements OnInit
{
  newUserTeamForm!: FormGroup;
  userTeam$: Observable<IStoreData<IUserTeam> | null> =
    this._appRepository.userTeam$;
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
    });

    this.userTeam$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (res?.error) {
        this.errorMessage = res.error;
      }

      if (res?.data && this.currentUser) {
        // should not be in the component
        // move to service/store
        this._authService.setCurrentUser({
          ...this.currentUser,
          teamId: res?.data.id,
        });
        this._dialogRef.close(res?.data);
      }
    });
  }

  createTeam(): void {
    const formValue = this.newUserTeamForm.getRawValue();

    // check if form is valid instead
    if (!formValue.name) {
      this.errorMessage = 'Team Name is required.';
      return;
    }

    this._actions.dispatch(createUserTeam(formValue.name));
  }

  onClosePopup() {
    this._dialogRef.close();
  }
}
