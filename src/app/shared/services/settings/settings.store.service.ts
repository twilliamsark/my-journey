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

  public state = signal<SettingsState>({
    searchDate: null,
    query: ``,
    order: SETTINGS_ORDER_VALUES[1],
  });

  private stateLoaded = signal<{
    orderLoaded: boolean;
    queryLoaded: boolean;
  }>({
    orderLoaded: false,
    queryLoaded: false,
  });

  order = computed(() => this.state().order);
  orderLoaded = computed(() => this.stateLoaded().orderLoaded);

  query = computed(() => this.state().query);
  queryLoaded = computed(() => this.stateLoaded().queryLoaded);

  newOrder$ = new Subject<SettingsOrderType>();
  private order$ = this.storage.loadOrder$;

  newQuery$ = new Subject<string>();
  private query$ = this.storage.loadQuery$;

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

    this.query$.pipe(takeUntilDestroyed()).subscribe({
      next: (query) => {
        this.state.update((state) => ({
          ...state,
          query,
        }));
        this.stateLoaded.update((stateLoaded) => ({
          ...stateLoaded,
          queryLoaded: true,
        }));
      },
      error: (err) => {
        this.state.update((state) => ({
          ...state,
        }));
        this.stateLoaded.update((stateLoaded) => ({
          ...stateLoaded,
          queryLoaded: false,
        }));
        // TODO: Add 'error' to SettingsState
        console.error(err);
        console.error('loadQuery$ ', this.state());
      },
    });

    this.newOrder$.pipe(takeUntilDestroyed()).subscribe((order) => {
      this.state.update((state) => ({
        ...state,
        order,
      }));
    });

    this.newQuery$.pipe(takeUntilDestroyed()).subscribe((query) => {
      this.state.update((state) => ({
        ...state,
        query,
      }));
    });

    effect(() => {
      if (this.orderLoaded()) {
        this.storage.saveOrder(this.order());
      }

      if (this.queryLoaded()) {
        this.storage.saveQuery(this.query());
      }
    });
  }
}
