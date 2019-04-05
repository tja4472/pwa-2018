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
    ofType(AuthApiActions.autoSignIn.type),
    exhaustMap(() =>
      this.authService.autoSignIn().pipe(
        map((user) => {
          if (!!user) {
            return AuthApiActions.autoSignInHaveUser({ user });
          } else {
            return AuthApiActions.autoSignInNoUser();
          }
        })
      )
    )
  );

  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.pipe(
    ofType(SignInPageActions.showSignUpPage.type),
    tap(() => {
      this.router.navigate(['/sign-up']);
    })
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(SignInPageActions.signIn.type),
    exhaustMap((action) =>
      this.authService.login(action.credentials).pipe(
        map((user) => AuthApiActions.signInSuccess({ user })),
        catchError((error) => of(AuthApiActions.signInFailure({ error })))
      )
    )
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(SignUpPageActions.signUp.type),
    exhaustMap((action) =>
      this.authService.signUp(action.credentials).pipe(
        map((user) => AuthApiActions.signUpSuccess({ user })),
        catchError((error) => of(AuthApiActions.signUpFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  authSignInSuccess$ = this.actions$.pipe(
    ofType(
      AuthApiActions.signInSuccess.type,
      AuthApiActions.signUpSuccess.type
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
    ofType(AuthApiActions.signOut.type),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tap(() => this.router.navigate(['/sign-in'])),
        map(() => AuthApiActions.signOutComplete())
        // catchError(() => of(new SignOutComplete()))
      )
    )
  );

  // ==
  // SignOutConfirmationAlert
  // ==
  @Effect({ dispatch: false })
  signOutConfirmationAlertShow$ = this.actions$.pipe(
    ofType(SignOutConfirmationAlertActions.show.type),
    tap(() => this.signOutConfirmationAlertService.show())
  );

  @Effect()
  signOutConfirmationAccepted$ = this.actions$.pipe(
    ofType(SignOutConfirmationAlertActions.accepted.type),
    map(() => AuthApiActions.signOut())
  );
  // ==

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => AuthApiActions.autoSignIn())
  );

  constructor(
    private actions$: Actions<
      | AuthApiActions.AuthApiActionsUnion
      | SignInPageActions.SignInPageActionsUnion
      | SignUpPageActions.SignUpPageActionsUnion
      | SignOutConfirmationAlertActions.SignOutConfirmationAlertActionsUnion
    >,
    private authService: AuthService,
    private router: Router,
    private signOutConfirmationAlertService: SignOutConfirmationAlertService
  ) {}
}
