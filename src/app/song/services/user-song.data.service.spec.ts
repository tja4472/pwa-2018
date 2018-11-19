import { Injectable } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

import { AngularFirestore } from '@angular/fire/firestore';

import { EnvironmentService } from '@app/core/environment.service';
import { UserSongDataService } from '@app/song/services/user-song.data.service';

import { Store, StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from '@app/reducers';

describe('Service: UserSongDataService - TestBed', () => {
  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    // collection: (someString) => {
    // return mocked collection here
    // },
  };

  const StoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    // collection: (someString) => {
    // return mocked collection here
    // },
  };

  @Injectable()
  class FakeEnvironmentService extends EnvironmentService {
    get appCode() {
      return 'aa';
    }
  }

  let environmentService: EnvironmentService;
  let userSongDataService: UserSongDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      // Provide both the service-to-test and its dependencies.
      providers: [
        UserSongDataService,
        { provide: EnvironmentService, useClass: FakeEnvironmentService },
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        // { provide: Store, useValue: StoreStub}
      ],
    });

    userSongDataService = TestBed.get(UserSongDataService);
    environmentService = TestBed.get(EnvironmentService);
  });

  it('should be created', inject(
    [UserSongDataService],
    (service: UserSongDataService) => {
      expect(service).toBeTruthy();
    }
  ));
});
