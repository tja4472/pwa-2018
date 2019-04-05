import { createAction, union } from '@ngrx/store';

export const accepted = createAction('[Sign Out Confirmation Alert] Accepted');

export const cancelled = createAction(
  '[Sign Out Confirmation Alert] Cancelled'
);

export const show = createAction('[Sign Out Confirmation Alert] Show');

const all = union({
  accepted,
  cancelled,
  show,
});

export type SignOutConfirmationAlertActionsUnion = typeof all;
