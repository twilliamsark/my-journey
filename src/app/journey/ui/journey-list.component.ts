import { Component, Input } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular/standalone';
import { Journey } from 'src/app/shared/interfaces/journey';
import { JourneyItemComponent } from './journey-item.component';

@Component({
  selector: 'app-journey-list',
  standalone: true,
  imports: [IonAccordionGroup, JourneyItemComponent],
  styles: ``,
  template: `
    <ion-accordion-group
      expand="inset"
      multiple="false"
      [value]="journeys[0].id"
    >
      @for (journey of journeys; track journey.id) {
        <app-journey-item [journey]="journey"></app-journey-item>
      }
    </ion-accordion-group>
  `,
})
export class JourneyListComponent {
  @Input({ required: true }) journeys!: Journey[];
}
