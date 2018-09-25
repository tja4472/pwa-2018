import { Action } from '@ngrx/store';

export enum HomePageActionTypes {
  SignOut = '[HomePage] Sign Out',
}

export class SignOut implements Action {
  readonly type = HomePageActionTypes.SignOut;
}

export type HomePageActions = SignOut;
