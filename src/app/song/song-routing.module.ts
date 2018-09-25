import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SongDetailPageComponent } from './containers/song-detail-page/song-detail-page.component';
import { SongListPageComponent } from './containers/song-list-page/song-list-page.component';
import { UserSongDetailPageComponent } from './containers/user-song-detail-page/user-song-detail-page.component';
import { UserSongListPageComponent } from './containers/user-song-list-page/user-song-list-page.component';

const routes: Routes = [
  { path: '', component: SongListPageComponent },
  { path: 'song-detail/:id', component: SongDetailPageComponent },

  { path: 'my-songs-detail/:id', component: UserSongDetailPageComponent },
  { path: 'my-songs', component: UserSongListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongRoutingModule {}
