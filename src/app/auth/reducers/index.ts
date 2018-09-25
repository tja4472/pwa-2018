import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRoot from '@app/reducers';

import * as fromAuth from '@app/auth/reducers/auth.reducer';
import * as fromSignInPage from '@app/auth/reducers/sign-in-page.reducer';
import * as fromSignUpPage from '@app/auth/reducers/sign-up-page.reducer';

export interface AuthFeatureState {
  auth: fromAuth.AuthState;
  loginPage: fromSignInPage.SignInPageState;
  signUpPage: fromSignUpPage.SignUpPageState;
}

export interface State extends fromRoot.State {
  authFeature: AuthFeatureState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  auth: fromAuth.authReducer,
  loginPage: fromSignInPage.signInPageReducer,
  signUpPage: fromSignUpPage.signUpPageReducer,
};

export const selectAuthFeatureState = createFeatureSelector<
  State,
  AuthFeatureState
>('authFeature');
