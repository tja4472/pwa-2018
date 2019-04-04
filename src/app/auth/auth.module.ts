import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { SignInFormComponent } from '@app/auth/components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '@app/auth/components/sign-up-form/sign-up-form.component';
import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '@app/auth/containers/sign-up-page/sign-up-page.component';
import { AuthEffects } from '@app/auth/effects/auth.effects';
import { reducers } from '@app/auth/reducers';

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
