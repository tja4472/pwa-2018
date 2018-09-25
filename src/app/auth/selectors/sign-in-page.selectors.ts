import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { SignInPageState } from '@app/auth/reducers/sign-in-page.reducer';

const selectSignInPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.loginPage
);

const selectSignInPageError = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.error
);

const selectSignInPagePending = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.pending
);

export const signInPageQuery = {
  selectSignInPageError,
  selectSignInPagePending,
};
