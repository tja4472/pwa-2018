import { Component, Input, OnInit } from '@angular/core';

import { ViewUserSong } from '../../models/view-user-song.model';

@Component({
  selector: 'tja-user-song-list',
  templateUrl: './user-song-list.component.html',
  styleUrls: ['./user-song-list.component.css'],
})
export class UserSongListComponent {
  //
  @Input()
  data: ReadonlyArray<ViewUserSong>;
}
