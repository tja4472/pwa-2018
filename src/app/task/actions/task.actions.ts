import { Action } from '@ngrx/store';

export enum TaskActionTypes {
  LoadTasks = '[Task] Load Tasks',
}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LoadTasks;
}

export type TaskActions = LoadTasks;
