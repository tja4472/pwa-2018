import { createAction, props, union } from '@ngrx/store';

import { UserModel } from '@app/auth/models/user.model';

export const autoSignIn = createAction('[Auth/API] Auto Sign In');

export const autoSignInHaveUser = createAction(
  '[Auth/API] Auto Sign In - Have User',
  props<{ user: UserModel }>()
);

export const autoSignInNoUser = createAction(
  '[Auth/API] Auto Sign In - No User'
);

export const signInFailure = createAction(
  '[Auth/API] Sign In - Failure',
  props<{ error: any }>()
);

export const signInSuccess = createAction(
  '[Auth/API] Sign In - Success',
  props<{ user: UserModel }>()
);

export const signOut = createAction('[Auth API] Sign Out');

export const signOutComplete = createAction('[Auth API] Sign Out - Complete');

export const signUpFailure = createAction(
  '[Auth/API] Sign Up - Failure',
  props<{ error: any }>()
);

export const signUpSuccess = createAction(
  '[Auth/API] Sign Up - Success',
  props<{ user: UserModel }>()
);

const all = union({
  autoSignIn,
  autoSignInHaveUser,
  autoSignInNoUser,
  signInFailure,
  signInSuccess,
  signOut,
  signOutComplete,
  signUpFailure,
  signUpSuccess,
});

export type AuthApiActionsUnion = typeof all;
