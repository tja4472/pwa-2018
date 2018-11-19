import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { AuthState } from '@app/auth/reducers/auth.reducer';

const selectAuthState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.auth
);

const selectHasChecked = createSelector(
  selectAuthState,
  (state: AuthState) => state.hasChecked
);

const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user) => !!user
);

/*
export const selectIsLoggedInChecked = createSelector(
  selectIsLoggedIn,
  selectHasChecked,
  (isLoggedIn: boolean, hasChecked: boolean) => {
    if (hasChecked) {
      return isLoggedIn;
    } else {
      return false;
    }
  }
);
*/

export const authQuery = {
  selectHasChecked,
  selectAuthUser,
  selectIsLoggedIn,
};
