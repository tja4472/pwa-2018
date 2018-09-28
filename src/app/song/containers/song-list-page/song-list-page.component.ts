import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { BehaviorSubject, Observable, pipe } from 'rxjs';

import { ViewSong } from '../../models/view-song.model';
import { SongService } from '../../services/song.service';
import { UserSongDataService } from '../../services/user-song.data.service';

import { UserSong } from '../../models/user-song.model';

import * as fromSong from '../../reducers';

// import { selectAuthUser } from '../../../auth/reducers';

import { UserModel } from '../../../auth/models/user.model';

import {
  SongsPageDeleteUserSong,
  SongsPageSearch,
  SongsPageUpdateUserSong,
} from '../../actions/song.actions';

import {
  DeletedMyKeySignaturePayload,
  UpdatedMyKeySignaturePayload,
} from '../../event-emitter.interfaces';

import { first } from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-song-list-page',
  templateUrl: './song-list-page.component.html',
  styleUrls: ['./song-list-page.component.css'],
})
export class SongListPageComponent implements OnInit {
  public data$: Observable<ReadonlyArray<ViewSong>>;
  public searchText$: Observable<string>;
  public user$: Observable<UserModel>;

  constructor(
    private songService: SongService,
    private userSongDataService: UserSongDataService,
    private store: Store<fromSong.State>
  ) {
    //
    // this.data$ = this.songService.getData$();
    // this.data$ = this.store.pipe(select(fromSong.getAllSongs));
    this.data$ = this.store.pipe(select(fromSong.getViewSongList));
    this.searchText$ = this.store.pipe(
      select(fromSong.getSelectSearchText),
      first()
    );
    this.user$ = this.store.pipe(select(authQuery.selectAuthUser));
  }

  ngOnInit() {
    //
    // this.songService.ListenForDataStart();
  }

  addToMySongs(songId: string) {
    console.log('addToMySongs>', songId);
    const userSong: UserSong = {
      id: songId,
      keySignature: 'dummy',
    };

    this.userSongDataService.aaaaInsertItem(userSong);
  }

  doSearch(value) {
    //
    // const value = event.target.value;
    // console.log('doSearch:value>', event);
    this.store.dispatch(new SongsPageSearch({ searchText: value }));
  }

  onDeletedMyKeySignature(payload: DeletedMyKeySignaturePayload) {
    //
    this.store.dispatch(new SongsPageDeleteUserSong(payload));
  }

  onUpdatedMyKeySignature(payload: UpdatedMyKeySignaturePayload) {
    //
    this.store.dispatch(
      new SongsPageUpdateUserSong({
        userSong: {
          keySignature: payload.keySignature,
          id: payload.songId,
        },
      })
    );
  }
}
