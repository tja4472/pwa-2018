import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { merge, Observable } from 'rxjs';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { newUserSong, UserSong } from '../../models/user-song.model';

import * as UserSongActions from '../../actions/user-song.actions';
import * as fromSongs from '../../reducers';
import { UserSongDataService } from '../../services/user-song.data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-user-song-detail-page',
  templateUrl: './user-song-detail-page.component.html',
  styleUrls: ['./user-song-detail-page.component.css'],
})
export class UserSongDetailPageComponent implements OnInit {
  //
  public song$: Observable<UserSong>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: UserSongDataService,
    private store: Store<fromSongs.State>
  ) {}

  ngOnInit() {
    const id$: Observable<string> = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      tap((id) => console.log('##id>', id))
      // share()
    );

    const newSong$: Observable<UserSong> = id$.pipe(
      filter((id) => id === 'new'),
      map(() => {
        return newUserSong();
      })
    );

    const existingSong$ = id$.pipe(
      tap((id) => console.log('existingSong$:id>', id)),
      filter((id) => id !== 'new'),
      tap((id) => {
        console.log('id>', id);
        return this.store.dispatch(new UserSongActions.SelectItem({ id }));
      }),
      switchMap(() => this.store.pipe(select(fromSongs.getSelectedUserSong)))
    );

    this.song$ = merge(newSong$, existingSong$);
  }

  onSubmitted(song: UserSong) {
    console.log('onSubmitted>', song);
    this.dataService
      // .upsertItem(song, '')
      .aaaaInsertItem(song);

    // .then(() => {
    // don't have song.id of inserted item.
    this.router.navigate(['/songs']);
    /*
      this.router.navigate([
        '/songs',
        { id: song.id },
      ]);
*/
    //  })
    //  .catch((error) => {
    //    console.log('error>', error);
    //  });

    /*
    this.store
      .pipe(
        select(getUserId),
        take(1),
      )
      .subscribe((userId) => {
        // this.store.dispatch(new TaskActions.UpsertItem({ item: task, userId }));
        this.taskDataService
          .upsertItem(task, userId)
          .then(() => {
            this.router.navigate([
              '/cloud-firestore',
              { id: task.id, foo: 'foo' },
            ]);
            // this.router.navigate(['/cloud-firestore']);
          })
          .catch((error) => {
            console.log('error>', error);
          });
      });
    */
  }
}
