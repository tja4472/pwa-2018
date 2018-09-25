import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers';

import { SongEffects } from './effects/song.effects';
import { UserSongEffects } from './effects/user-song.effects';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyKeySignatureFormComponent } from './components/my-key-signature-form/my-key-signature-form.component';
import { SongDetailFormComponent } from './components/song-detail-form/song-detail-form.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { UserSongDetailFormComponent } from './components/user-song-detail-form/user-song-detail-form.component';
import { UserSongListComponent } from './components/user-song-list/user-song-list.component';

import { SongDetailPageComponent } from './containers/song-detail-page/song-detail-page.component';
import { SongListPageComponent } from './containers/song-list-page/song-list-page.component';
import { UserSongDetailPageComponent } from './containers/user-song-detail-page/user-song-detail-page.component';
import { UserSongListPageComponent } from './containers/user-song-list-page/user-song-list-page.component';

import { SongListItemComponent } from './components/song-list-item/song-list-item.component';
import { SongRoutingModule } from './song-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    StoreModule.forFeature('song-feature', reducers),
    EffectsModule.forFeature([SongEffects, UserSongEffects]),
    SongRoutingModule,
  ],
  declarations: [
    MyKeySignatureFormComponent,
    SongDetailFormComponent,
    SongDetailPageComponent,
    SongListComponent,
    SongListItemComponent,
    SongListPageComponent,
    UserSongDetailFormComponent,
    UserSongDetailPageComponent,
    UserSongListComponent,
    UserSongListPageComponent,
  ],
})
export class SongModule {}

/*
export const COMPONENTS = [
  SongListPageComponent,
];

// https://angular.io/guide/singleton-services

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
  ],
  declarations: COMPONENTS,
  // exports: [SignInPageComponent]
  // exports: COMPONENTS,
})
export class SongModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: SongModule
  ) {
    if (parentModule) {
      throw new Error(
        'SongModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  // tslint:disable-next-line:member-ordering
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      // providers: [AuthService, AuthGuardService, UserInfoDataService],
    };
  }
}

// tslint:disable-next-line:max-classes-per-file
@NgModule({
  imports: [
    SongModule,
    SongRoutingModule,    
    // StoreModule.forFeature('auth-feature', reducers),
    // EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {}
*/
