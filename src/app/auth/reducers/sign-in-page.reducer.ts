import { AuthApiActions, SignInPageActions } from '@app/auth/actions';

export interface SignInPageState {
  pending: boolean;
  error: string | null;
}

export const initialState: SignInPageState = {
  error: null,
  pending: false,
};

export function signInPageReducer(
  state = initialState,
  action:
    | AuthApiActions.AuthApiActionsUnion
    | SignInPageActions.SignInPageActionsUnion
): SignInPageState {
  switch (action.type) {
    case SignInPageActions.SignInPageActionTypes.SignIn: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActions.AuthApiActionTypes.SignInSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActions.AuthApiActionTypes.SignInFailure: {
      return {
        ...state,
        error: action.payload.error,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}
