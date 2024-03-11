import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Journey } from 'src/app/shared/interfaces/journey';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [IonList, IonItem, IonLabel],
  template: `
    <ion-list lines="none">
      @for (journey of journeys; track journey.id) {
        <ion-item>
          <ion-label class="ion-text-nowrap">
            <h3>{{ createdOn(journey) }}</h3>
            <p>{{ journey.title }}</p>
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
