import { Action } from '@ngrx/store';

import { TaskActions, TaskActionTypes } from '@app/task/actions/task.actions';

// tslint:disable-next-line:no-empty-interface
export interface State {}

export const initialState: State = {};

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {
    case TaskActionTypes.LoadTasks:
      return state;

    default:
      return state;
  }
}
