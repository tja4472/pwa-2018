import { createAction, props, union } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';

export const showSignUpPage = createAction('[Sign In Page]  Show Sign Up Page');

export const signIn = createAction(
  '[Sign In Page] Sign In',
  props<{ credentials: Credentials }>()
);

const all = union({
  showSignUpPage,
  signIn,
});

export type SignInPageActionsUnion = typeof all;
