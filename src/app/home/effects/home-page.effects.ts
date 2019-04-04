import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { SignOutConfirmationAlertActions } from '@app/auth/actions';
import * as fromHomePageActions from '@app/home/actions/home-page.actions';

@Injectable()
export class HomePageEffects {
  //
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<fromHomePageActions.SignOut>(
      fromHomePageActions.HomePageActionTypes.SignOut
    ),
    map(() => new SignOutConfirmationAlertActions.Show())
  );

  constructor(private actions$: Actions) {}
}
