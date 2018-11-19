import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { merge, Observable } from 'rxjs';
import { filter, map, share, switchMap, tap } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { newSong, Song } from '../../models/song.model';

import * as SongActions from '../../actions/song.actions';
import * as fromSongs from '../../reducers';
import { SongDataService } from '../../services/song.data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tja-song-detail-page',
  templateUrl: './song-detail-page.component.html',
  styleUrls: ['./song-detail-page.component.css'],
})
export class SongDetailPageComponent implements OnInit {
  //
  public song$: Observable<Song>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: SongDataService,
    private store: Store<fromSongs.State>
  ) {}

  ngOnInit() {
    const id$: Observable<string> = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      tap((id) => console.log('##id>', id))
      // share()
    );

    const newSong$: Observable<Song> = id$.pipe(
      filter((id) => id === 'new'),
      map(() => {
        return newSong();
      })
    );

    const existingSong$ = id$.pipe(
      tap((id) => console.log('existingSong$:id>', id)),
      filter((id) => id !== 'new'),
      tap((id) => {
        console.log('id>', id);
        return this.store.dispatch(new SongActions.SelectItem({ id }));
      }),
      switchMap(() => this.store.pipe(select(fromSongs.getSelectedSong)))
    );

    this.song$ = merge(newSong$, existingSong$);
  }

  onSubmitted(song: Song) {
    console.log('onSubmitted>', song);

    // offline problem
    // https://github.com/angular/angularfire2/issues/1453

    this.dataService
      .upsertItem(song, '')
      .then(() => {
        console.log('onSubmitted:success');
        // don't have song.id of inserted item.
        this.router.navigate(['/songs']);
        /*
      this.router.navigate([
        '/songs',
        { id: song.id },
      ]);
*/
      })
      .catch((error) => {
        console.log('onSubmitted:failure');
        console.log('error>', error);
      });

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
