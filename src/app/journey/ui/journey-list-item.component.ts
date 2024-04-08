import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Journey } from 'src/app/shared/interfaces/journey';
import {
  IonAccordion,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonTextarea,
} from '@ionic/angular/standalone';
import { formatDate } from '@angular/common';
import { addIcons } from 'ionicons';
import { cogOutline, pencil } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-journey-list-item',
  imports: [IonAccordion, IonItem, IonLabel, IonIcon, IonButton, IonTextarea],
  styles: `
    div[slot='content'] {
      color: var(--ion-color-blanchedalmond-contrast);
      background: rgba(var(--ion-color-blanchedalmond-rgb), 0.25);
    }

    ion-accordion {
      margin-bottom: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    }

    .journey-title {
      font-size: large;
      font-weight: bold;
    }

    .journey-note {
      font-size: large;
      white-space: pre-wrap;
    }
  `,
  template: `
    <ion-accordion [value]="journey.id">
      <ion-item slot="header" color="blanchedalmond">
        <ion-label>
          <h2 class="journey-title">{{ journey.title }}</h2>
          <p>{{ createdOn(journey) }}</p>
        </ion-label>
        @if (selected) {
          <ion-button
            fill="clear"
            slot="end"
            (click)="
              $event.stopPropagation(); $event.preventDefault(); onEdit()
            "
          >
            <ion-icon slot="icon-only" name="cog-outline" color="dark" />
          </ion-button>
        }
      </ion-item>
      <div class="ion-padding journey-note" slot="content">
        <ion-textarea readonly="true">{{ journey.note }}</ion-textarea>
      </div>
    </ion-accordion>
  `,
})
export class JourneyListItemComponent {
  @Input({ required: true }) journey!: Journey;
  @Input({ required: true }) selected: boolean = false;
  @Output() edit = new EventEmitter<Journey>();

  onEdit() {
    this.edit.emit(this.journey);
  }

  createdOn(journey: Journey) {
    return formatDate(journey.createdOn || Date.now(), 'medium', 'en-US');
  }

  constructor() {
    addIcons({ cogOutline, pencil });
  }
}
