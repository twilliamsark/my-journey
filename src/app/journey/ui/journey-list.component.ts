import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Journey } from 'src/app/shared/interfaces/journey';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
  styles: `
    .journey-entry {
      color: var(--ion-color-light);
    }

    ion-label {
      background-color: var(--ion-color-success);
      padding: 10px;
    }

    ion-item {
      border-radius: 5px;
      border-left: 4px solid var(--ion-color-tertiary);
      padding-right: 5px;
    }
  `,
  template: `
    <ion-list lines="none">
      @for (journey of journeys; track journey.id) {
        <ion-item>
          <ion-label class="ion-text-nowrap">
            <h2 class="journey-entry">{{ createdOn(journey) }}</h2>
            <p class="journey-entry">{{ journey.title }}</p>
          </ion-label>
        </ion-item>
      }
    </ion-list>
  `,
})
export class JourneyListComponent {
  @Input({ required: true }) journeys!: Journey[];

  createdOn(journey: Journey) {
    return formatDate(journey.createdOn || Date.now(), 'medium', 'en-US');
  }
}
