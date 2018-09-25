import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  UpsertItem,
} from '../actions/song.actions';

// import * as FromAuthSelector from '../auth/auth.selector';
import * as FromRootReducer from '../reducers';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Song } from '../models/song.model';

// TaskDespatchers??????
@Injectable({
  providedIn: 'root',
})
export class SongService {
  //
  /*
  private init$ = this.store.pipe(
    select(FromAuthSelector.getUserId),
    filter((userId) => userId !== ''),
  );
  */

  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<ReadonlyArray<Song>> {
    //
    return this.store.pipe(select(FromRootReducer.getAllSongs));
  }

  public ListenForDataStart(): void {
    //
    // this.init$.pipe(take(1)).subscribe((userId) => {
    // this.store.dispatch(new DatabaseListenForDataStart({ userId: '' }));
    // });
  }

  public ListenForDataStop(): void {
    //
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: Song) {
    //
    // this.init$.pipe(take(1)).subscribe((userId) => {
    this.store.dispatch(new DeleteItem({ id: item.id }));
    // });
  }

  public upsertItem(item: Song) {
    //
    // this.init$.pipe(take(1)).subscribe((userId) => {
    this.store.dispatch(new UpsertItem({ item }));
    // });
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
