import { Injectable, computed, inject, signal } from '@angular/core';
import { AddJourney, Journey, JourneyId } from '../interfaces/journey';
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
    journeys: [
      {
        id: '1',
        createdOn: new Date().toISOString(),
        title: '1st step',
        note: 'See 2nd step',
      },
      {
        id: '2',
        createdOn: new Date().toISOString(),
        title: '2nd step',
        note: 'Something to journal on is what you have accomplished — goals you set or some that might have surprised you (like scuba diving), how you felt within and after those accomplishments and what else you have to achieve in life.',
      },
    ],
    error: '',
  });

  journeys = computed(() => this.state().journeys);
  error = computed(() => this.state().error);

  add$ = new Subject<AddJourney>();
  private filter$ = new Subject<{}>();
  private journeys$: Observable<JourneyDocument[]> = combineLatest([
    this.storage.db$,
    this.filter$,
  ]).pipe(switchMap(([db, filter]) => db.journeys.find(filter).$));

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
