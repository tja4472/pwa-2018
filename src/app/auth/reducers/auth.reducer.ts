import { AuthApiActions } from '@app/auth/actions';
import { UserModel } from '@app/auth/models/user.model';

export interface AuthState
  extends Readonly<{
    hasChecked: boolean;
    user: UserModel | null;
  }> {}

export const initialState: AuthState = {
  hasChecked: false,
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion
): AuthState {
  switch (action.type) {
    case AuthApiActions.AuthApiActionTypes.AutoSignInNoUser:
      return { ...state, hasChecked: true };

    case AuthApiActions.AuthApiActionTypes.SignInSuccess:
    case AuthApiActions.AuthApiActionTypes.AutoSignInHaveUser:
    case AuthApiActions.AuthApiActionTypes.SignUpSuccess:
      return { ...state, hasChecked: true, user: action.payload.user };

    case AuthApiActions.AuthApiActionTypes.SignOut:
      return { ...initialState, hasChecked: true };

    default:
      return state;
  }
}
