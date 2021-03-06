import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { combineLatest, defer, EMPTY, from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
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
  UpsertItem,
  UpsertItemError,
  UpsertItemSuccess,
  UserSongActionTypes,
} from '../actions/user-song.actions';
import { UserSong } from '../models/user-song.model';
import * as FromRootReducer from '../reducers';
import { UserSongDataService } from '../services/user-song.data.service';

// import { selectAuthUser } from '../../auth/reducers';

/*
import {
  AuthActionTypes,
  AutoLoginSuccess,
  LoginSuccess,
} from '../../auth/actions/auth.actions';
*/

@Injectable()
export class UserSongEffects {
  constructor(
    private actions$: Actions,
    private dataService: UserSongDataService,
    private store$: Store<FromRootReducer.State>
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(UserSongActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id, payload.userId);
    })
  );

  // listen for loginSuccess &  AutoLoginSuccess

  /*
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public aaaaa$ = this.actions$.pipe(
    ofType<LoginSuccess | AutoLoginSuccess>(
      AuthActionTypes.AutoLoginSuccess,
      AuthActionTypes.LoginSuccess
    ),
    tap((x) => {
      console.log('LoginSuccess | AutoLoginSuccess');
    })
  );
  */

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_STOP
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      switch (action.type) {
        case UserSongActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
          return this.dataService.getData$(action.payload.userId).pipe(
            map((items: UserSong[]) => {
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
              return EMPTY;
            })
          );
        }

        default: {
          return EMPTY;
        }
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public upsertItem$ = this.actions$.pipe(
    ofType<UpsertItem>(UserSongActionTypes.UPSERT_ITEM),
    map((action) => action.payload),
    switchMap((payload) => {
      return from(
        this.dataService.upsertItem(payload.item, payload.userId)
      ).pipe(
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
    // withLatestFrom(this.store$.select(selectAuthUser)),
    (o) => combineLatest(o, this.store$.select(authQuery.selectAuthUser)),
    tap((x) => console.log('kkkkkkkkkkkkkkkkkkkk>', x)),
    map(([, userModel]) => userModel),
    filter((userModel) => !!userModel),
    tap((x) => console.log('kkkkkkkkuserModel>', x)),
    map((userModel) => userModel.id),
    map((userId) => new DatabaseListenForDataStart({ userId }))
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
