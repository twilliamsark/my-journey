import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      }),
    ),
  ],
};
