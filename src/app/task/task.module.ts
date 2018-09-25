import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TaskEffects } from '@app/task/effects/task.effects';
import * as fromTask from '@app/task/reducers/task.reducer';
import { TaskRoutingModule } from '@app/task/task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    StoreModule.forFeature('task', fromTask.reducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  declarations: [],
})
export class TaskModule {}
