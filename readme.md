## Add Auth Module to Ionic App

- tsconfig.json

  ```json
  "baseUrl": "src",
  "paths": {
   "@app/*": ["app/*"]
  },
  ```

- package.json

  ```json
  "dependencies": {
    "@angular/fire": "5.0.0",
    "@ngrx/effects": "6.1.0",
    "@ngrx/entity": "6.1.0",
    "@ngrx/router-store": "6.1.0",
    "@ngrx/store": "6.1.0",
    "@ngrx/store-devtools": "6.1.0",
    "firebase": "5.4.2",
   },
  "devDependencies": {
    "ngrx-store-freeze": "0.2.4",
  }
  ```

- app.module.ts

  ```ts
  import { environment } from 'environments/environment';

  import { AngularFireModule } from '@angular/fire';
  import { AngularFireAuthModule } from '@angular/fire/auth';
  import { AngularFirestoreModule } from '@angular/fire/firestore';

  import { EffectsModule } from '@ngrx/effects';
  import { StoreRouterConnectingModule } from '@ngrx/router-store';
  import { StoreModule } from '@ngrx/store';
  import { StoreDevtoolsModule } from '@ngrx/store-devtools';

  import { metaReducers, reducers } from '@app/reducers';

  import { AuthModule } from '@app/auth/auth.module';

  @NgModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule.enablePersistence(),
      AngularFireAuthModule,
      AngularFirestoreModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([]),
      AuthModule,
      StoreRouterConnectingModule.forRoot({
        stateKey: 'router', // name of reducer key
      }),
      StoreDevtoolsModule.instrument({
        name: 'NgRx 2018',
      })
    ]
  })
  ```

- environment.service.ts
- src\app\reducers\index.ts
- environment.ts
- environment.prod.ts
