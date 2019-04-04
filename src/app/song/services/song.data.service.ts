import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

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

import { EnvironmentService } from '@app/core/environment.service';

import { Song } from '../models/song.model';

// tslint:disable-next-line:no-submodule-imports

// const APP_KEY = 'apps/b-local-song-app-1';

// const DATA_COLLECTION = APP_KEY + '/songs';
// const USERS_COLLECTION = APP_KEY + '/users';

interface FirestoreDoc {
  alsoKnownAs: string;
  comment: string;
  composer: string;
  hasLyrics: boolean;
  id: string;
  keySignature: string;
  lyricist: string;
  style: string;
  timeSignature: string;
  title: string;
  year: number;
}

@Injectable({
  providedIn: 'root',
})
export class SongDataService {
  public get dataCollectionPath(): string {
    return 'apps/' + this.environmentService.appCode + '/songs';
  }

  constructor(
    public readonly afs: AngularFirestore,
    public readonly environmentService: EnvironmentService
  ) {}

  /*
        // == startsWith ==
        const strSearch = "Ai";
        const strlength = strSearch.length;
        const strFrontCode = strSearch.slice(0, strlength-1);
        const strEndCode = strSearch.slice(strlength-1, strSearch.length);

        const startcode = strSearch;
        const endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

        return (
          this.afs
            .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
              ref.where('title', '>=', startcode).where('title', '<', endcode)
            )
    
        )        
        // ==============    
*/

  public listenForData$(searchText: string): Observable<Song[]> {
    //
    if (searchText === '') {
      // return everything.
      console.log('everything');
      const collection = this.afs.collection<FirestoreDoc>(
        this.dataCollectionPath,
        (ref) => ref.orderBy('title')
      );

      return collection.valueChanges().pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
    }

    // apply filter.
    console.log('apply filter');
    // == startsWith ==
    const length = searchText.length;
    const frontCode = searchText.slice(0, length - 1);
    const endCode = searchText.slice(length - 1, length);

    const startcode = searchText;
    const endcode = frontCode + String.fromCharCode(endCode.charCodeAt(0) + 1);

    const filteredCollection = this.afs.collection<FirestoreDoc>(
      this.dataCollectionPath,
      (ref) =>
        ref
          .orderBy('title')
          .where('title', '>=', startcode)
          .where('title', '<', endcode)
    );

    return filteredCollection.valueChanges().pipe(
      map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        })
      )
    );
  }

  public getData$(userId: string): Observable<Song[]> {
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

  public upsertItem(item: Song, userId: string): Promise<void> {
    //
    if (item.id === '') {
      return this.createItem(item, userId);
    } else {
      return this.updateItem(item, userId);
    }
  }

  private createItem(item: Song, userId: string): Promise<void> {
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

  private updateItem(item: Song, userId: string): Promise<void> {
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
    return (
      this.afs
        // .collection(USERS_COLLECTION)
        // .doc(userId)
        .collection<FirestoreDoc>(this.dataCollectionPath, (ref) =>
          ref.orderBy('title')
        )
    );
  }

  private toFirestoreDoc(item: Song) {
    //
    const result: FirestoreDoc = {
      alsoKnownAs: item.alsoKnownAs,
      comment: item.comment,
      composer: item.composer,
      hasLyrics: item.hasLyrics,
      id: item.id,
      keySignature: item.keySignature,
      lyricist: item.lyricist,
      style: item.style,
      timeSignature: item.timeSignature,
      title: item.title,
      year: item.year,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): Song {
    //
    const result: Song = {
      alsoKnownAs: x.alsoKnownAs,
      comment: x.comment,
      composer: x.composer,
      hasLyrics: x.hasLyrics,
      id: x.id,
      keySignature: x.keySignature,
      lyricist: x.lyricist,
      style: x.style,
      timeSignature: x.timeSignature,
      title: x.title,
      year: x.year,
    };

    return result;
  }
}
