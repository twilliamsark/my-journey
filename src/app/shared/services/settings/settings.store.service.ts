import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { SettingsStorageService } from './settings.storage.service';
import {
  SETTINGS_ORDER_VALUES,
  SettingsOrderType,
  SettingsState,
} from '../../interfaces/settings';

@Injectable({ providedIn: 'root' })
export class SettingsStoreService {
  private storage = inject(SettingsStorageService);

  private state = signal<SettingsState>({
    searchDate: null,
    query: ``,
    order: SETTINGS_ORDER_VALUES[1],
  });

  private stateLoaded = signal<{
    orderLoaded: boolean;
  }>({
    orderLoaded: false,
  });

  order = computed(() => this.state().order);
  orderLoaded = computed(() => this.stateLoaded().orderLoaded);

  newOrder$ = new Subject<SettingsOrderType>();
  private order$ = this.storage.loadOrder$;

  constructor() {
    this.order$.pipe(takeUntilDestroyed()).subscribe({
      next: (order) => {
        this.state.update((state) => ({
          ...state,
          order,
        }));
        this.stateLoaded.update((stateLoaded) => ({
          ...stateLoaded,
          orderLoaded: true,
        }));
      },
      error: (err) => {
        this.state.update((state) => ({
          ...state,
        }));
        this.stateLoaded.update((stateLoaded) => ({
          ...stateLoaded,
          orderLoaded: false,
        }));
        // TODO: Add 'error' to SettingsState
        console.error(err);
        console.error('loadOrder$ ', this.state());
      },
    });

    this.newOrder$.pipe(takeUntilDestroyed()).subscribe((order) => {
      this.state.update((state) => ({
        ...state,
        order,
      }));
    });

    effect(() => {
      if (this.orderLoaded()) {
        this.storage.saveOrder(this.order());
      }
    });
  }
}
