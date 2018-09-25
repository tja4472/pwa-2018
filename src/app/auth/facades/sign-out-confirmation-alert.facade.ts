import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { SignOutConfirmationAlertActions } from '@app/auth/actions';

import { State } from '@app/auth/reducers';

@Injectable({
  providedIn: 'root',
})
export class SignOutConfirmationAlertFacade {
  constructor(private store: Store<{}>) {}

  public Accepted() {
    this.store.dispatch(new SignOutConfirmationAlertActions.Accepted());
  }

  public Cancelled() {
    this.store.dispatch(new SignOutConfirmationAlertActions.Cancelled());
  }

  public Show() {
    this.store.dispatch(new SignOutConfirmationAlertActions.Show());
  }
}
