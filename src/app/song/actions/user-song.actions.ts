// tslint:disable:max-classes-per-file
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { UserSong } from '../models/user-song.model';

export enum UserSongActionTypes {
  DATABASE_LISTEN_FOR_DATA_START = '[UserSong] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_START_ERROR = '[UserSong] (Database) Listen For Data - Start - Error',
  DATABASE_LISTEN_FOR_DATA_STOP = '[UserSong] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[UserSong] Delete Item',
  LOAD_SUCCESS = '[UserSong] Load Success',
  SELECT_ITEM = '[UserSong] Select Item',
  UPSERT_ITEM = '[UserSong] Upsert item',
  UPSERT_ITEM_ERROR = '[UserSong] Upsert Item - Error ',
  UPSERT_ITEM_SUCCESS = '[UserSong] Upsert Item - Success',
}

export class DatabaseListenForDataStart implements Action {
  public readonly type = UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    }
  ) {}
}

export class DatabaseListenForDataStartError implements Action {
  public readonly type =
    UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_START_ERROR;

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
  public readonly type = UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}

export class DeleteItem implements Action {
  public readonly type = UserSongActionTypes.DELETE_ITEM;

  constructor(
    public payload: {
      id: string;
      userId: string;
    }
  ) {}
}

export class LoadSuccess implements Action {
  public readonly type = UserSongActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: UserSong[] }) {}
}

export class SelectItem implements Action {
  public readonly type = UserSongActionTypes.SELECT_ITEM;

  constructor(public payload: { id: string }) {}
}

export class UpsertItem implements Action {
  public readonly type = UserSongActionTypes.UPSERT_ITEM;

  constructor(
    public payload: {
      item: UserSong;
      userId: string;
    }
  ) {}
}

export class UpsertItemError implements Action {
  public readonly type = UserSongActionTypes.UPSERT_ITEM_ERROR;

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
  public readonly type = UserSongActionTypes.UPSERT_ITEM_SUCCESS;
}

export type UserSongActions =
  | DatabaseListenForDataStart
  | DatabaseListenForDataStartError
  | DatabaseListenForDataStop
  | LoadSuccess
  | SelectItem;
