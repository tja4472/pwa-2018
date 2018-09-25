import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '@app/auth/containers/sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
