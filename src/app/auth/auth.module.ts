import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { AuthEffects } from '@app/auth/effects/auth.effects';
import { reducers } from '@app/auth/reducers';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';

import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '@app/auth/containers/sign-up-page/sign-up-page.component';

import { SignInFormComponent } from '@app/auth/components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '@app/auth/components/sign-up-form/sign-up-form.component';

export const COMPONENTS = [
  SignInPageComponent,
  SignInFormComponent,
  SignUpFormComponent,
  SignUpPageComponent,
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('authFeature', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
