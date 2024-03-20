import { Injectable, computed, inject, signal } from '@angular/core';
import { AddJourney, EditJourney, Journey } from '../interfaces/journey';
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

export interface JourneyState {
  journeys: Journey[];
  error: string;
}

@Injectable({ providedIn: 'root' })
export class JourneyStoryService {
  private storage = inject(JourneyStorageService);

  private state = signal<JourneyState>({
    journeys: [],
    error: '',
  });

  journeys = computed(() => this.state().journeys);
  error = computed(() => this.state().error);

  private journeys$: Observable<JourneyDocument[]> = this.storage.db$.pipe(
    switchMap((db) => db.journeys.find().$),
  );

  add$ = new Subject<AddJourney>();
  edit$ = new Subject<EditJourney>();

  constructor() {
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
}
