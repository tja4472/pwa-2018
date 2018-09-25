// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';
import { UserModel } from '@app/auth/models/user.model';

export enum SignInPageActionTypes {
  SignIn = '[Sign In Page] Sign In',
}

export class SignIn implements Action {
  readonly type = SignInPageActionTypes.SignIn;

  constructor(readonly payload: { credentials: Credentials }) {}
}

export type SignInPageActionsUnion = SignIn;
