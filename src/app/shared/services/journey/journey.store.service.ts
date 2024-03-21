import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AddJourney, EditJourney, Journey } from '../../interfaces/journey';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Observable,
  Subject,
  combineLatest,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import {
  JourneyDocument,
  JourneyStorageService,
} from './journey.storage.service';
import { SettingsStoreService } from '../settings/settings.store.service';
import { SettingsState } from '../../interfaces/settings';
import { addProp } from '../../utils';

export interface JourneyState {
  journeys: Journey[];
  error: string;
}

@Injectable({ providedIn: 'root' })
export class JourneyStoryService {
  private storage = inject(JourneyStorageService);
  private settings = inject(SettingsStoreService);

  private state = signal<JourneyState>({
    journeys: [],
    error: '',
  });

  journeys = computed(() => this.state().journeys);
  error = computed(() => this.state().error);

  add$ = new Subject<AddJourney>();
  edit$ = new Subject<EditJourney>();

  private filter$ = new Subject<{}>();
  private journeys$: Observable<JourneyDocument[]> = combineLatest([
    this.storage.db$,
    this.filter$,
  ]).pipe(switchMap(([db, filter]) => db.journeys.find(filter).$));

  constructor() {
    effect(() => {
      this.filter$.next(this.queryRestrictions(this.settings.state()));
    });

    this.journeys$
      .pipe(takeUntilDestroyed())
      .subscribe((journeys: JourneyDocument[]) =>
        this.state.update((state) => ({
          ...state,
          journeys,
        })),
      );

    this.add$
      .pipe(withLatestFrom(this.storage.db$), takeUntilDestroyed())
      .subscribe(([journey, db]) =>
        db.journeys.insert({ ...this.initAdd(journey) }),
      );

    this.edit$
      .pipe(withLatestFrom(this.storage.db$), takeUntilDestroyed())
      .subscribe(async ([update, db]) => {
        const journeyToMod = await db.journeys.findOne(update.id).exec();

        if (journeyToMod) {
          journeyToMod.modify((journey) => ({
            ...journey,
            title: update.data.title,
            note: update.data.note,
          }));
        }
      });
  }

  private initAdd(journey: AddJourney) {
    const time = new Date();

    return {
      id: time.getTime().toString(),
      createdOn: time.toISOString(),
      ...journey,
    };
  }

  private queryRestrictions(settings: SettingsState) {
    let filter = {};

    if (settings) {
      if (settings.order) addProp(filter, 'sort', [{ id: settings.order }]);
      if (settings.query) {
        addProp(filter, 'selector', {});
        const regex = { $regex: `.*${settings.query}.*`, $options: 'i' };
        const queryFields = [
          {
            title: regex,
          },
          {
            note: regex,
          },
        ];
        addProp(filter.selector, '$or', queryFields);
      }
    }

    return filter;
  }
}
