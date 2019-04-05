import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { authQuery } from '@app/auth/selectors/auth.selectors';
import { signInPageQuery } from '@app/auth/selectors/sign-in-page.selectors';
import { signUpPageQuery } from '@app/auth/selectors/sign-up-page.selectors';

import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public authUser$: Observable<UserModel>;

  public signInPageError$: Observable<string>;

  public signInPagePending$: Observable<boolean>;

  public signUpPageError$: Observable<string>;

  public signUpPagePending$: Observable<boolean>;

  constructor(private store: Store<{}>) {
    this.authUser$ = store.pipe(select(authQuery.selectAuthUser));

    this.signInPageError$ = store.pipe(
      select(signInPageQuery.selectSignInPageError)
    );

    this.signInPagePending$ = store.pipe(
      select(signInPageQuery.selectSignInPagePending)
    );

    this.signUpPageError$ = store.pipe(
      select(signUpPageQuery.selectSignUpPageError)
    );

    this.signUpPagePending$ = store.pipe(
      select(signUpPageQuery.selectSignUpPagePending)
    );
  }

  public dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
