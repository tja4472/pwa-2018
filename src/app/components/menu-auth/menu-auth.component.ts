import { Component, Input, OnInit } from '@angular/core';

import { UserModel } from '@app/auth/models/user.model';

@Component({
  selector: 'tja-menu-auth',
  templateUrl: './menu-auth.component.html',
  styleUrls: ['./menu-auth.component.css'],
})
export class MenuAuthComponent implements OnInit {
  //
  @Input()
  user: Readonly<UserModel>;

  constructor() {}

  ngOnInit() {}

  signedInUser() {
    //
    if (!!this.user) {
      // Have user
      return this.user.email;
    } else {
      // No user
      return 'Not Signed In';
    }
  }
}
