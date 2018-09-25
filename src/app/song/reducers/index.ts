import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromSongListPage from './song-list-page.reducer';
import * as fromSong from './song.reducer';
import * as fromUserSong from './user-song.reducer';

import { UserSong } from '../models/user-song.model';
import { newViewSong, ViewSong } from '../models/view-song.model';
import { newViewUserSong, ViewUserSong } from '../models/view-user-song.model';

export interface SongFeatureState {
  song: fromSong.State;
  songListPage: fromSongListPage.State;
  userSong: fromUserSong.State;
}

// export interface State extends fromRoot.State {
// tslint:disable-next-line:no-empty-interface
export interface State {
  // auth: fromAuth.State;
}

export const reducers: ActionReducerMap<SongFeatureState> = {
  song: fromSong.reducer,
  songListPage: fromSongListPage.reducer,
  userSong: fromUserSong.reducer,
};

// tslint:disable-next-line:array-type
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectSongFeatureState = createFeatureSelector<SongFeatureState>(
  'song-feature'
);

//#region Song selectors
export const selectSongState = createSelector(
  selectSongFeatureState,
  (state: SongFeatureState) => state.song
);

export const getSelectedSongId = createSelector(
  selectSongState,
  fromSong.getSelectedId
);

export const {
  selectIds: getSongIds,
  selectEntities: getSongEntities,
  selectAll: getAllSongs,
  selectTotal: getTotalSongs,
} = fromSong.adapter.getSelectors(selectSongState);

export const getSelectedSong = createSelector(
  getSongEntities,
  getSelectedSongId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
//#endregion

//#region SongListPage selectors
export const selectSongListPageState = createSelector(
  selectSongFeatureState,
  (state: SongFeatureState) => state.songListPage
);

export const getSelectKeySignatureError = createSelector(
  selectSongListPageState,
  fromSongListPage.selectKeySignatureError
);

export const getSelectSearchText = createSelector(
  selectSongListPageState,
  fromSongListPage.selectSearchText
);
//#endregion

//#region UserSong selectors
export const selectUserSongState = createSelector(
  selectSongFeatureState,
  (state: SongFeatureState) => state.userSong
);

export const getSelectedUserSongId = createSelector(
  selectUserSongState,
  fromUserSong.getSelectedId
);

export const {
  selectIds: getUserSongIds,
  selectEntities: getUserSongEntities,
  selectAll: getAllUserSongs,
  selectTotal: getTotalUserSongs,
} = fromUserSong.adapter.getSelectors(selectUserSongState);

export const getSelectedUserSong = createSelector(
  getUserSongEntities,
  getSelectedUserSongId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
//#endregion

export const getViewUserSongList = createSelector(
  getUserSongIds,
  getUserSongEntities,
  getSongEntities,
  (userSongIds, userSongEntities, songEntities) => {
    // const x: Dictionary<UserSong> = userSongIds;
    // let y = x.keys[].map((n) => n);
    console.log('userSongIds>', userSongIds);

    const y = Object.values(userSongIds).map((songId) => {
      // const y = Object.keys(userSongIds).map(songId => {
      // console.log('@@@userSongId>', userSongIds[songId]);

      console.log('@@@songId>', songId);
      const song = songEntities[songId];
      console.log('@@@song>', song);

      const userSong = userSongEntities[songId];

      const result: ViewUserSong = {
        ...newViewUserSong(),
        songId,
        keySignature: userSong.keySignature,
        songKeySignature: song.keySignature,
        songTitle: song.title,
      };

      return result;
    });

    return y;
  }
);

export const getViewSongList = createSelector(
  getAllSongs,
  getUserSongIds,
  getUserSongEntities,
  (songs, userSongIds, userSongEntities) => {
    const result = songs.map((song) => {
      const index = Object.values(userSongIds).findIndex((x) => x === song.id);
      const isUserSong = index > -1;
      const userSong = userSongEntities[song.id];

      const viewSong: ViewSong = {
        ...newViewSong(),
        alsoKnownAs: song.alsoKnownAs,
        comment: song.comment,
        composer: song.composer,
        hasLyrics: song.hasLyrics,
        id: song.id,
        isUserSong,
        keySignature: song.keySignature,
        lyricist: song.lyricist,
        style: song.style,
        timeSignature: song.timeSignature,
        title: song.title,
        userKeySignature: !!userSong ? userSong.keySignature : '',
        year: song.year,
      };

      return viewSong;
    });

    return result;
  }
);
