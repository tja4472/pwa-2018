import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HomePageEffects } from '@app/home/effects/home-page.effects';

describe('HomePageEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: HomePageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomePageEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(HomePageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
