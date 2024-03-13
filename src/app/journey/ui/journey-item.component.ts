import { Component, Input } from '@angular/core';
import { Journey } from 'src/app/shared/interfaces/journey';
import {
  IonAccordion,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { formatDate } from '@angular/common';
import { addIcons } from 'ionicons';
import { cog, pencil } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-journey-item',
  imports: [IonAccordion, IonItem, IonLabel, IonIcon, IonButton],
  styles: `
    div[slot='content'] {
      background: rgba(var(--ion-color-rose-rgb), 0.25);
    }
  `,
  template: `
    <ion-accordion [value]="journey.id">
      <ion-item slot="header" color="rose">
        <ion-label>
          <h2>{{ journey.title }}</h2>
          <p>{{ createdOn(journey) }}</p>
        </ion-label>
        <ion-button fill="clear" slot="end">
          <ion-icon slot="icon-only" name="cog"></ion-icon>
        </ion-button>
      </ion-item>
      <div class="ion-padding" slot="content">{{ journey.note }}</div>
    </ion-accordion>
  `,
})
export class JourneyItemComponent {
  @Input({ required: true }) journey!: Journey;

  createdOn(journey: Journey) {
    return formatDate(journey.createdOn || Date.now(), 'medium', 'en-US');
  }

  constructor() {
    addIcons({ cog, pencil });
  }
}
