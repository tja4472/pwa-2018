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
    case SignUpPageActions.SignUpPageActionTypes.SignUp: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthApiActions.AuthApiActionTypes.SignUpSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthApiActions.AuthApiActionTypes.SignUpFailure: {
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
