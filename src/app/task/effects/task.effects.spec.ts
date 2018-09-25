import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TaskEffects } from '@app/task/effects/task.effects';

describe('TaskEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: TaskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(TaskEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
