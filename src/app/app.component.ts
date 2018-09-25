import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Observable } from 'rxjs';

import { AuthFacade } from '@app/auth/facades/auth.facade';
import { UserModel } from '@app/auth/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list',
    },
    {
      title: 'Songs',
      url: '/songs',
      icon: 'list',
    },
    {
      title: 'My Songs',
      url: '/songs/my-songs',
      icon: 'list',
    },    
  ];

  public user$: Observable<UserModel>;

  constructor(private authFacade: AuthFacade, private platform: Platform) {
    this.user$ = this.authFacade.authUser$;

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {});
  }
}
