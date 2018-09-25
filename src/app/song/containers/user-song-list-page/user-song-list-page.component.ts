import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, pipe } from 'rxjs';

import { ViewUserSong } from '../../models/view-user-song.model';
import { UserSongService } from '../../services/user-song.service';

@Component({
  selector: 'tja-user-song-list-page',
  templateUrl: './user-song-list-page.component.html',
  styleUrls: ['./user-song-list-page.component.css'],
})
export class UserSongListPageComponent implements OnInit {
  public data$: Observable<ReadonlyArray<ViewUserSong>>;

  constructor(private userSongService: UserSongService) {
    //
    // this.data$ = this.userSongService.getData$();
    this.data$ = this.userSongService.getAAA$();

    // this.userSongService.getAAA$().subscribe((x) => console.log('view>', x));
  }
  ngOnInit() {
    //
    // this.userSongService.ListenForDataStart();
  }
}
