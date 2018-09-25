import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { SongActions, SongActionTypes } from '../actions/song.actions';
import { Song } from '../models/song.model';

export interface State extends EntityState<Song> {
  // additional entities state properties
  selectedSongId: string | null;
}

export const adapter: EntityAdapter<Song> = createEntityAdapter<Song>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedSongId: null,
});

export function reducer(state = initialState, action: SongActions): State {
  switch (action.type) {
    case SongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP: {
      return adapter.removeAll({
        ...state,
        loaded: false,
        loading: false,
        selectedSongId: '',
      });
    }

    case SongActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload.items, state);
    }

    case SongActionTypes.SELECT_ITEM: {
      return {
        ...state,
        selectedSongId: action.payload.id,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedSongId;
