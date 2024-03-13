import { Injectable, computed, signal } from '@angular/core';
import { AddJourney, Journey } from '../interfaces/journey';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

export interface JourneyState {
  journeys: Journey[];
  error: string;
}

@Injectable({ providedIn: 'root' })
export class JourneyStoryService {
  private state = signal<JourneyState>({
    journeys: [
      this.initAdd({ title: '1st step' }),
      this.initAdd({
        title: '2nd step',
        note: 'Something to journal on is what you have accomplished — goals you set or some that might have surprised you (like scuba diving), how you felt within and after those accomplishments and what else you have to achieve in life.',
      }),
    ],
    error: '',
  });

  add$ = new Subject<AddJourney>();
  journeys = computed(() => this.state().journeys);

  constructor() {
    this.add$.pipe(takeUntilDestroyed()).subscribe((journey) =>
      this.state.update((state) => ({
        ...state,
        journeys: [...state.journeys, { ...this.initAdd(journey) }],
      })),
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
