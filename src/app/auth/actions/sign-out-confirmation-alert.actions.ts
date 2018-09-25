// tslint:disable:max-classes-per-file
/*
 * Call using:
 // tslint:disable:no-duplicate-imports
import * as fromSignOutConfirmationAlertActions from '@app/auth/actions/sign-out-confirmation-alert.actions';
import {
  SignOutConfirmationAlertActions,
  SignOutConfirmationAlertActionTypes,
} from '@app/auth/actions/sign-out-confirmation-alert.actions';
// tslint:enable:no-duplicate-imports
*/
import { Action } from '@ngrx/store';

export enum SignOutConfirmationAlertActionTypes {
  Cancelled = '[Sign Out Confirmation Alert] Cancelled',
  Accepted = '[Sign Out Confirmation Alert] Accepted',
  Show = '[Sign Out Confirmation Alert] Show',
}

export class Accepted implements Action {
  readonly type = SignOutConfirmationAlertActionTypes.Accepted;
}

export class Cancelled implements Action {
  readonly type = SignOutConfirmationAlertActionTypes.Cancelled;
}

export class Show implements Action {
  readonly type = SignOutConfirmationAlertActionTypes.Show;
}

export type SignOutConfirmationAlertActionsUnion = Show | Cancelled | Accepted;
