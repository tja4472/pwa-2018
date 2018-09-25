import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
  UserSongActions,
  UserSongActionTypes,
} from '../actions/user-song.actions';
import { UserSong } from '../models/user-song.model';

export interface State extends EntityState<UserSong> {
  // additional entities state properties
  selectedId: string | null;
}

export const adapter: EntityAdapter<UserSong> = createEntityAdapter<UserSong>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null,
});

export function reducer(state = initialState, action: UserSongActions): State {
  switch (action.type) {
    case UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP: {
      return adapter.removeAll({
        ...state,
        loaded: false,
        loading: false,
        selectedSongId: '',
      });
    }

    case UserSongActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload.items, state);
    }

    case UserSongActionTypes.SELECT_ITEM: {
      return {
        ...state,
        selectedId: action.payload.id,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedId;
