import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import {
  SETTINGS_ORDER_VALUES,
  SettingsOrderType,
} from '../../interfaces/settings';

const STORAGE_PREFIX = 'my-journey:settings:';

@Injectable({ providedIn: 'root' })
export class SettingsStorageService {
  private ionicStorage = inject(Storage);
  private storage$ = from(this.ionicStorage.create()).pipe(shareReplay(1));

  private orderLoaded = false;
  private queryLoaded = false;

  loadOrder$: Observable<SettingsOrderType> = this.storage$.pipe(
    switchMap((storage) => from(storage.get(`${STORAGE_PREFIX}order`))),
    map((order) =>
      order
        ? (JSON.parse(order) as SettingsOrderType)
        : SETTINGS_ORDER_VALUES[1],
    ),
    tap(() => (this.orderLoaded = true)),
    shareReplay(1),
  );

  saveOrder(order: SettingsOrderType) {
    if (this.orderLoaded) {
      this.storage$.pipe(take(1)).subscribe((storage) => {
        storage.set(`${STORAGE_PREFIX}order`, JSON.stringify(order));
      });
    }
  }

  loadQuery$: Observable<string> = this.storage$.pipe(
    switchMap((storage) => from(storage.get(`${STORAGE_PREFIX}query`))),
    tap(() => (this.queryLoaded = true)),
    shareReplay(1),
  );

  saveQuery(query: string) {
    if (this.queryLoaded) {
      this.storage$.pipe(take(1)).subscribe((storage) => {
        storage.set(`${STORAGE_PREFIX}query`, query);
      });
    }
  }
}
