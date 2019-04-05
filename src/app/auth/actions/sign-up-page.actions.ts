import { createAction, props, union } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';
import { UserModel } from '@app/auth/models/user.model';

export const signUp = createAction(
  '[Sign Up Page] Sign Up',
  props<{ credentials: Credentials }>()
);

export const signUpFailure = createAction(
  '[Sign Up Page] Sign Up - Failure',
  props<{ error: any }>()
);

export const signUpSuccess = createAction(
  '[Sign Up Page] Sign Up - Success',
  props<{ user: UserModel }>()
);

const all = union({
  signUp,
  signUpFailure,
  signUpSuccess,
});

export type SignUpPageActionsUnion = typeof all;
