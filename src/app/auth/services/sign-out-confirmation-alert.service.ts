import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { AlertOptions } from '@ionic/core';

import { SignOutConfirmationAlertFacade } from '@app/auth/facades/sign-out-confirmation-alert.facade';

@Injectable({
  providedIn: 'root',
})
export class SignOutConfirmationAlertService {
  constructor(
    private alertCtrl: AlertController,
    private signOutConfirmationAlertFacade: SignOutConfirmationAlertFacade
  ) {}

  public async show() {
    const options: AlertOptions = {
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Cancel============');
            this.signOutConfirmationAlertFacade.Cancelled();
          },
        },
        {
          text: 'Ok',
          handler: () => {
            // console.log('OK============');
            this.signOutConfirmationAlertFacade.Accepted();
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
