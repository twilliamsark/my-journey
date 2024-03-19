import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular/standalone';
import { Journey } from 'src/app/shared/interfaces/journey';
import { JourneyListItemComponent } from './journey-list-item.component';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [IonAccordionGroup, JourneyListItemComponent],
  styles: ``,
  template: `
    <ion-accordion-group
      expand="inset"
      multiple="false"
      [value]="journeys[0].id"
    >
      @for (journey of journeys; track journey.id) {
        <app-journey-list-item
          [journey]="journey"
          (edit)="editTriggered($event)"
        />
      }
    </ion-accordion-group>
  `,
})
export class JourneyListComponent {
  @Input({ required: true }) journeys!: Journey[];
  @Output() edit = new EventEmitter<Journey>();

  editTriggered(journey: Journey) {
    this.edit.emit(journey);
  }
}
