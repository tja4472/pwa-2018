import { Component, OnInit } from '@angular/core';

import { SignUpPageActions } from '@app/auth/actions';
import { AuthFacade } from '@app/auth/facades/auth.facade';
import { Credentials } from '@app/auth/models/credentials.model';

@Component({
  selector: 'tja-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  error$ = this.authFacade.signUpPageError$;
  pending$ = this.authFacade.signUpPagePending$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}

  onSubmitted(credentials: Credentials) {
    this.authFacade.dispatch(SignUpPageActions.signUp({ credentials }));
  }
}
