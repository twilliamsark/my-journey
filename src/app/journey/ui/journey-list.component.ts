import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
      (ionChange)="accordionGroupChange($event)"
    >
      @for (journey of journeys; track journey.id) {
        <app-journey-list-item
          [journey]="journey"
          [selected]="selectedValue === journey.id"
          (edit)="editTriggered($event)"
        />
      }
    </ion-accordion-group>
  `,
})
export class JourneyListComponent implements OnInit {
  @Input({ required: true }) journeys!: Journey[];
  @Output() edit = new EventEmitter<Journey>();
  selectedValue = '';

  ngOnInit(): void {
    if (this.journeys && this.journeys.length > 0) {
      this.selectedValue = this.journeys[0].id;
    }
  }

  editTriggered(journey: Journey) {
    this.edit.emit(journey);
  }

  accordionGroupChange(ev: any) {
    this.selectedValue = ev.detail.value;
  }
}
