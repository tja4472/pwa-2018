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
    case SignInPageActions.signIn.type: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActions.signInSuccess.type: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActions.signInFailure.type: {
      return {
        ...state,
        error: action.error,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}
