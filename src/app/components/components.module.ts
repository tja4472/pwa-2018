// tslint:disable:object-literal-sort-keys
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAuthComponent } from '@app/components/menu-auth/menu-auth.component';

@NgModule({
  imports: [
    // ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [MenuAuthComponent],
  entryComponents: [],
  exports: [MenuAuthComponent],
})
export class ComponentsModule {}
