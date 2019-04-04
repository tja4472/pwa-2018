import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserModel } from '../../../auth/models/user.model';
import { UserSong } from '../../models/user-song.model';
import { ViewSong } from '../../models/view-song.model';

import {
  DeletedMyKeySignaturePayload,
  UpdatedMyKeySignaturePayload,
} from '../../event-emitter.interfaces';

@Component({
  selector: 'tja-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent {
  //
  @Input()
  data: ReadonlyArray<ViewSong>;
  @Input()
  user: Readonly<UserModel>;

  @Output()
  readonly addToMySongs = new EventEmitter<string>();
  @Output()
  readonly deletedMyKeySignature = new EventEmitter<
    DeletedMyKeySignaturePayload
  >();
  @Output()
  readonly updatedMyKeySignature = new EventEmitter<
    UpdatedMyKeySignaturePayload
  >();
  constructor() {}

  canAddToMySongs(isUserSong: boolean) {
    //
    if (!!this.user) {
      // Have user
      if (isUserSong) {
        return false;
      } else {
        return true;
      }
    } else {
      // No user
      return false;
    }
  }

  isSignedIn(): boolean {
    //
    return !!this.user;
  }

  doAddToMySongs(id: string) {
    //
    console.log('doAddToMySongs>', id);
    // this.addToMySongs.emit(id);
  }

  onMyKeySignatureSubmitted(keySignature: string, songId: string) {
    //
    console.log(
      'onMyKeySignatureSubmitted:keySignature, songId>',
      keySignature,
      songId
    );
    if (keySignature === '') {
      // Deleted
      this.deletedMyKeySignature.emit({ songId });
    } else {
      // Updated
      this.updatedMyKeySignature.emit({
        keySignature,
        songId,
      });
    }
  }
}
