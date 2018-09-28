import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  UpsertItem,
} from '../actions/user-song.actions';

// import * as FromAuthSelector from '../auth/auth.selector';
// import { selectAuthUser } from '../../auth/reducers';
import * as FromRootReducer from '../reducers';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { UserSong } from '../models/user-song.model';
import { ViewUserSong } from '../models/view-user-song.model';

import { authQuery } from '@app/auth/selectors/auth.selectors';

// TaskDespatchers??????
@Injectable({
  providedIn: 'root',
})
export class UserSongService {
  //

  private init$ = this.store.pipe(
    select(authQuery.selectAuthUser),
    map((x) => x.id),
    filter((userId) => userId !== '')
  );

  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<ReadonlyArray<UserSong>> {
    //
    return this.store.pipe(select(FromRootReducer.getAllUserSongs));
  }

  public getAAA$(): Observable<ReadonlyArray<ViewUserSong>> {
    return this.store.pipe(select(FromRootReducer.getViewUserSongList));
  }

  public ListenForDataStart(): void {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DatabaseListenForDataStart({ userId }));
    });
  }

  public ListenForDataStop(): void {
    //
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: UserSong) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DeleteItem({ id: item.id, userId }));
    });
  }

  public upsertItem(item: UserSong) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new UpsertItem({ item, userId }));
    });
  }

  /*
  public isLoaded(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getGadgetLoaded));
  }

  public isLoading(): Observable<boolean> {
    return this.store.pipe(select(FromRootReducer.getGadgetLoading));
  }
  */
}
