import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';

import { HomePageEffects } from '@app/home/effects/home-page.effects';
import { HomePage } from '@app/home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    EffectsModule.forFeature([HomePageEffects]),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
