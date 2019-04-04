import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { defer, empty, from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStartError,
  DatabaseListenForDataStop,
  DeleteItem,
  LoadSuccess,
  SongActionTypes,
  SongsPageSearch,
  SongsPageUpdateUserSong,
  SongsPageUpdateUserSongFailure,
  SongsPageUpdateUserSongSuccess,
  UpsertItem,
  UpsertItemError,
  UpsertItemSuccess,
} from '../actions/song.actions';
import { Song } from '../models/song.model';
import * as FromRootReducer from '../reducers';
import { SongDataService } from '../services/song.data.service';
import { UserSongDataService } from '../services/user-song.data.service';

// import { selectAuthUser } from '../../auth/reducers';


@Injectable()
export class SongEffects {
  constructor(
    private actions$: Actions,
    private dataService: SongDataService,
    private userSongDataService: UserSongDataService,
    private store$: Store<FromRootReducer.State>
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(SongActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id, 'dummy');
    })
  );

  /*
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      SongActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      SongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      switch (action.type) {
        case SongActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
          return this.dataService.getData$('dummy').pipe(
            map((items: Song[]) => {
              this.store$.dispatch(new LoadSuccess({ items }));
            }),
            catchError((error) => {
              this.store$.dispatch(
                new DatabaseListenForDataStartError({
                  error: this.handleFirebaseError(error),
                })
              );
              // Pass on to higher level.
              // throw error;
              return empty();
            })
          );
        }

        default: {
          return empty();
        }
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    })
  );
  */

  // tslint:disable-next-line:member-ordering
  @Effect()
  public SongsPageUpdateUserSong$ = this.actions$.pipe(
    ofType<SongsPageUpdateUserSong>(SongActionTypes.SongsPageUpdateUserSong),
    map((action) => action.payload),
    withLatestFrom(this.store$.select(authQuery.selectAuthUser)),
    switchMap(([payload, user]) => {
      console.log('#####>', payload, user);
      return this.userSongDataService
        .upsertItem(payload.userSong, user.id)
        .then(() => {
          return new SongsPageUpdateUserSongSuccess();
        })
        .catch((error) => {
          return new SongsPageUpdateUserSongFailure({ error });
        });
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public SongsPageSearch$ = this.actions$.pipe(
    ofType<SongsPageSearch>(SongActionTypes.SongsPageSearch),
    map((action) => action.payload),
    // exhaustMap((payload) => {
    //  concatMap((payload) => {
    switchMap((payload) => {
      return this.dataService.listenForData$(payload.searchText).pipe(
        map((items: Song[]) => {
          this.store$.dispatch(new LoadSuccess({ items }));
        }),
        tap(() => {
          console.log('Effect:SongsPageSearch$:B');
        })
      );
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public upsertItem$ = this.actions$.pipe(
    ofType<UpsertItem>(SongActionTypes.UPSERT_ITEM),
    map((action) => action.payload),
    switchMap((payload) => {
      return from(this.dataService.upsertItem(payload.item, 'dummy')).pipe(
        map(() => new UpsertItemSuccess()),
        catchError((error) =>
          of(
            new UpsertItemError({
              error: this.handleFirebaseError(error),
            })
          )
        )
      );
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    // map(() => new DatabaseListenForDataStart({ userId: '' }))
    map(() => new SongsPageSearch({ searchText: '' }))
  );

  private handleFirebaseError(firebaseError: any) {
    //
    return {
      code: firebaseError.code,
      message: firebaseError.message,
      name: firebaseError.name,
    };
  }
}
