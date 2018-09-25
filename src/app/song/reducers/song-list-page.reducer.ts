import { SongActions, SongActionTypes } from '../actions/song.actions';

export interface State {
  keySignatureError: string | null;
  searchText: string;
}

export const initialState: State = {
  keySignatureError: null,
  searchText: '',
};

export function reducer(state = initialState, action: SongActions): State {
  switch (action.type) {
    case SongActionTypes.SongsPageUpdateUserSongSuccess: {
      return initialState;
    }

    case SongActionTypes.SongsPageUpdateUserSongFailure: {
      return { ...state, keySignatureError: action.payload.error };
    }

    case SongActionTypes.SongsPageSearch: {
      return { ...state, searchText: action.payload.searchText };
    }

    default: {
      return state;
    }
  }
}

export const selectKeySignatureError = (state: State) =>
  state.keySignatureError;
export const selectSearchText = (state: State) => state.searchText;
