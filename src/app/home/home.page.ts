import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromHomePageActions from '@app/home/actions/home-page.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //
  constructor(private store: Store<{}>) {}

  signOut() {
    this.store.dispatch(new fromHomePageActions.SignOut());
  }
}
