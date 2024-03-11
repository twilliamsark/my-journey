import { Injectable, computed, signal } from '@angular/core';
import { AddJourney, Journey } from '../interfaces/journey';
import { newId } from '../utils';

export interface JourneyState {
  journeys: Journey[];
  error: string;
}

@Injectable({ providedIn: 'root' })
export class JourneyStoryService {
  private state = signal<JourneyState>({
    journeys: [
      this.addId({
        title: '1st step',
        text: 'Something to journal on is what you have accomplished — goals you set or some that might have surprised you (like scuba diving), how you felt within and after those accomplishments and what else you have to achieve in life.',
      }),
    ],
    error: '',
  });

  journeys = computed(() => this.state().journeys);

  private addId(journey: AddJourney): Journey {
    const time = new Date();
    const id = time.getTime().toString();
    const createdOn = time.toISOString();

    return {
      id,
      createdOn,
      ...journey,
    };
  }
}
