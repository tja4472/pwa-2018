import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { select, Store } from '@ngrx/store';

import { BehaviorSubject, Observable, pipe } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';
import { EnvironmentService } from '@app/core/environment.service';

import { UserSong } from '../models/user-song.model';
import * as FromRootReducer from '../reducers';

// const APP_KEY = 'apps/b-local-song-app-1';

// const DATA_COLLECTION = '/user-songs';
// const USERS_COLLECTION = APP_KEY + '/users';

interface FirestoreDoc {
  id: string;
  keySignature: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserSongDataService {
  /*
  public get dataCollectionPath(): string {
    return 'apps/' + this.environmentService.appCode + '/songs';
  }
  */

  //
  private init$ = this.store.pipe(
    select(authQuery.selectAuthUser),
    map((x) => x.id),
    filter((userId) => userId !== '')
  );

  constructor(
    private store: Store<FromRootReducer.State>,
    public readonly afs: AngularFirestore,
    public readonly environmentService: EnvironmentService
  ) {}

  public dataCollectionPath(userId: string): string {
    return (
      'apps/' + this.environmentService.appCode + '/users/' + userId + '/songs'
    );
  }

  public getData$(userId: string): Observable<UserSong[]> {
    //
    return this.firestoreCollection(userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
  }

  public deleteItem(id: string, userId: string): void {
    this.firestoreCollection(userId)
      .doc(id)
      .delete();
  }

  // set(doc) will overwite fields.
  public aaaaInsertItem(item: UserSong) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      // this.store.dispatch(new UpsertItem({ item, userId }));
      console.log('userId>', userId);
      // this.upsertItem(item, userId);
      const doc = this.toFirestoreDoc(item);

      this.firestoreCollection(userId)
        .doc(doc.id)
        .set(doc);
    });
  }

  public upsertItem(item: UserSong, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    // return Promise.reject('test promise reject');
    return this.firestoreCollection(userId)
      .doc(doc.id)
      .set(doc);
  }

  /*
  public upsertItem(item: UserSong, userId: string): Promise<void> {
    //
    if (item.id === '') {
      return this.createItem(item, userId);
    } else {
      return this.updateItem(item, userId);
    }
  }
*/

  private createItem(item: UserSong, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    doc.id = this.afs.createId();
    const recordToSet: FirestoreDoc = {
      ...doc,
    };

    return this.firestoreCollection(userId)
      .doc(recordToSet.id)
      .set(recordToSet);
  }

  private updateItem(item: UserSong, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    const recordToUpdate: FirestoreDoc = {
      ...doc,
    };

    return this.firestoreCollection(userId)
      .doc(doc.id)
      .update(recordToUpdate);
  }

  private firestoreCollection(userId: string) {
    //
    /*
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION);
    */
    return this.afs.collection<FirestoreDoc>(this.dataCollectionPath(userId));
  }

  private toFirestoreDoc(item: UserSong) {
    //
    const result: FirestoreDoc = {
      id: item.id,
      keySignature: item.keySignature,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): UserSong {
    //
    const result: UserSong = {
      id: x.id,
      keySignature: x.keySignature,
    };

    return result;
  }
}
