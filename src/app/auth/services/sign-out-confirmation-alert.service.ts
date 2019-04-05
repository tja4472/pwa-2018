import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

import { Store } from '@ngrx/store';

import { SignOutConfirmationAlertActions } from '@app/auth/actions';

@Injectable({
  providedIn: 'root',
})
export class SignOutConfirmationAlertService {
  constructor(private alertCtrl: AlertController, private store: Store<{}>) {}

  public async show() {
    const options: AlertOptions = {
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Cancel============');
            this.store.dispatch(SignOutConfirmationAlertActions.cancelled());
          },
        },
        {
          text: 'Ok',
          handler: () => {
            // console.log('OK============');
            this.store.dispatch(SignOutConfirmationAlertActions.accepted());
          },
        },
      ],
      header: 'Sign Out',
      backdropDismiss: false,
      message: 'Are you sure you want to sign out?',
    };
    const alert = await this.alertCtrl.create(options);
    await alert.present();
  }
}
