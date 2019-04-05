import { AuthApiActions, SignUpPageActions } from '@app/auth/actions';

export interface SignUpPageState {
  readonly pending: boolean;
  readonly error: string | null;
}

export const initialState: SignUpPageState = {
  pending: false,
  error: null,
};

export function signUpPageReducer(
  state = initialState,
  action:
    | AuthApiActions.AuthApiActionsUnion
    | SignUpPageActions.SignUpPageActionsUnion
): SignUpPageState {
  switch (action.type) {
    case SignUpPageActions.signUp.type: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActions.signUpSuccess.type: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActions.signUpFailure.type: {
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
