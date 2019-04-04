import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { defer, from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthApiActions,
  SignInPageActions,
  SignOutConfirmationAlertActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { AuthService } from '@app/auth/services/auth.service';
import { SignOutConfirmationAlertService } from '@app/auth/services/sign-out-confirmation-alert.service';

@Injectable()
export class AuthEffects {
  @Effect()
  autoSignIn$ = this.actions$.pipe(
    ofType<AuthApiActions.AutoSignIn>(
      AuthApiActions.AuthApiActionTypes.AutoSignIn
    ),
    exhaustMap(() =>
      this.authService.autoSignIn().pipe(
        map((user) => {
          if (!!user) {
            return new AuthApiActions.AutoSignInHaveUser({ user });
          } else {
            return new AuthApiActions.AutoSignInNoUser();
          }
        })
      )
    )
  );

  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.pipe(
    ofType<AuthApiActions.ShowSignUpPage>(
      AuthApiActions.AuthApiActionTypes.ShowSignUpPage
    ),
    tap(() => {
      this.router.navigate(['/sign-up']);
    })
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType<SignInPageActions.SignIn>(
      SignInPageActions.SignInPageActionTypes.SignIn
    ),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.authService.login(payload.credentials).pipe(
        map((user) => new AuthApiActions.SignInSuccess({ user })),
        catchError((error) => of(new AuthApiActions.SignInFailure({ error })))
      )
    )
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<SignUpPageActions.SignUp>(
      SignUpPageActions.SignUpPageActionTypes.SignUp
    ),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.authService.signUp(payload.credentials).pipe(
        map((user) => new AuthApiActions.SignUpSuccess({ user })),
        catchError((error) => of(new AuthApiActions.SignUpFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  authSignInSuccess$ = this.actions$.pipe(
    ofType<AuthApiActions.SignInSuccess | AuthApiActions.SignUpSuccess>(
      AuthApiActions.AuthApiActionTypes.SignInSuccess,
      AuthApiActions.AuthApiActionTypes.SignUpSuccess
    ),
    tap(() => {
      if (this.authService.redirectUrl === '') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.authService.redirectUrl]);
      }
    })
  );

  /*
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      // this.router.navigate(['/books']);
      if (this.authService.redirectUrl === '') {
        console.log('MMMMMMMMMMMM');
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.authService.redirectUrl]);
      }
    })
  );
*/

  /*
  @Effect()
  signOutConfirmation$ = this.actions$.pipe(
    ofType<SignOutConfirmationShow>(SignOutConfirmationActionTypes.Show),
    exhaustMap(() =>
      from(this.showSignOutPrompt()).pipe(
        map((confirmed) => {
          if (confirmed) {
            return new SignOutConfirmationOk();
          } else {
            return new SignOutConfirmationCancel();
          }
        })
      )
    )
  );
  */

  /*
    @Effect({ dispatch: false })
    logoutConfirmation$ = this.actions$
      .ofType<Logout>(AuthActionTypes.Logout)
      .pipe(
        tap(() => {
          console.log('### sign out ###');
          // this.showSignOutPrompt();
          this.showSignOutPrompt().then(() => {
           console.log('aaaaaa');
         });
        })
      );
    */

  /*
  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map((confirmed) => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            }),
          ),
      ),
    );
  */

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType<AuthApiActions.SignOut>(AuthApiActions.AuthApiActionTypes.SignOut),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tap(() => this.router.navigate(['/sign-in'])),
        map(() => new AuthApiActions.SignOutComplete())
        // catchError(() => of(new SignOutComplete()))
      )
    )
  );

  // ==
  // SignOutConfirmationAlert
  // ==
  @Effect({ dispatch: false })
  signOutConfirmationAlertShow$ = this.actions$.pipe(
    ofType<SignOutConfirmationAlertActions.Show>(
      SignOutConfirmationAlertActions.SignOutConfirmationAlertActionTypes.Show
    ),
    tap(() => this.signOutConfirmationAlertService.show())
  );

  @Effect()
  signOutConfirmationAccepted$ = this.actions$.pipe(
    ofType<SignOutConfirmationAlertActions.Accepted>(
      SignOutConfirmationAlertActions.SignOutConfirmationAlertActionTypes
        .Accepted
    ),
    map(() => new AuthApiActions.SignOut())
  );
  // ==

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => new AuthApiActions.AutoSignIn())
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private signOutConfirmationAlertService: SignOutConfirmationAlertService
  ) {}
}
