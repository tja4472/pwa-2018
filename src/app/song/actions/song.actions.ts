// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

import { Song } from '../models/song.model';
import { UserSong } from '../models/user-song.model';

export enum SongActionTypes {
  SongsPageDeleteUserSong = '[SongsPage] Delete UserSong',

  SongsPageSearch = '[SongsPage] Search',

  SongsPageUpdateUserSong = '[SongsPage] Update UserSong',
  SongsPageUpdateUserSongFailure = '[SongsPage] Update UserSong - Failure',
  SongsPageUpdateUserSongSuccess = '[SongsPage] Update UserSong - Success',

  DATABASE_LISTEN_FOR_DATA_START = '[Song] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_START_ERROR = '[Song] (Database) Listen For Data - Start - Error',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Song] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[Song] Delete Item',
  LOAD_SUCCESS = '[Song] Load Success',
  SELECT_ITEM = '[Song] Select Item',
  UPSERT_ITEM = '[Song] Upsert item',
  UPSERT_ITEM_ERROR = '[Song] Upsert Item - Error ',
  UPSERT_ITEM_SUCCESS = '[Song] Upsert Item - Success',
}

export class SongsPageDeleteUserSong implements Action {
  public readonly type = SongActionTypes.SongsPageDeleteUserSong;

  constructor(
    public payload: {
      songId: string;
    }
  ) {}
}

export class SongsPageSearch implements Action {
  public readonly type = SongActionTypes.SongsPageSearch;

  constructor(
    public payload: {
      searchText: string;
    }
  ) {}
}

//#region SongsPageUpdateUserSong
export class SongsPageUpdateUserSong implements Action {
  public readonly type = SongActionTypes.SongsPageUpdateUserSong;

  constructor(
    public payload: {
      userSong: UserSong;
    }
  ) {}
}

export class SongsPageUpdateUserSongFailure implements Action {
  public readonly type = SongActionTypes.SongsPageUpdateUserSongFailure;

  constructor(
    public payload: {
      error: any;
    }
  ) {}
}

export class SongsPageUpdateUserSongSuccess implements Action {
  public readonly type = SongActionTypes.SongsPageUpdateUserSongSuccess;
}
//#endregion

export class DatabaseListenForDataStart implements Action {
  public readonly type = SongActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      // userId: string;
    }
  ) {}
}

export class DatabaseListenForDataStartError implements Action {
  public readonly type = SongActionTypes.DATABASE_LISTEN_FOR_DATA_START_ERROR;

  constructor(
    public payload: {
      error: {
        code: string;
        message: string;
        name: string;
      };
    }
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  public readonly type = SongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}

export class DeleteItem implements Action {
  public readonly type = SongActionTypes.DELETE_ITEM;

  constructor(
    public payload: {
      id: string;
      // userId: string,
    }
  ) {}
}

export class LoadSuccess implements Action {
  public readonly type = SongActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: Song[] }) {}
}

export class SelectItem implements Action {
  public readonly type = SongActionTypes.SELECT_ITEM;

  constructor(public payload: { id: string }) {}
}

export class UpsertItem implements Action {
  public readonly type = SongActionTypes.UPSERT_ITEM;

  constructor(
    public payload: {
      item: Song;
      // userId: string,
    }
  ) {}
}

export class UpsertItemError implements Action {
  public readonly type = SongActionTypes.UPSERT_ITEM_ERROR;

  constructor(
    public payload: {
      error: {
        code: string;
        message: string;
        name: string;
      };
    }
  ) {}
}

export class UpsertItemSuccess implements Action {
  public readonly type = SongActionTypes.UPSERT_ITEM_SUCCESS;
}

export type SongActions =
  | DatabaseListenForDataStart
  | DatabaseListenForDataStartError
  | DatabaseListenForDataStop
  | LoadSuccess
  | SelectItem
  | SongsPageSearch
  | SongsPageUpdateUserSongSuccess
  | SongsPageUpdateUserSongFailure;
