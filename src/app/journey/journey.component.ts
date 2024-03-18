import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { JourneyStoryService } from '../shared/services/journey.store.service';
import { JourneyListComponent } from './ui/journey-list.component';
import { AddJourney, Journey } from '../shared/interfaces/journey';
import { JourneyFormComponent } from './ui/journey-form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    JourneyListComponent,
    JourneyFormComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="blanchedalmond">
        <ion-title>My Journey</ion-title>
        <ion-buttons slot="end">
          <ion-button
            (click)="
              $event.stopPropagation(); $event.preventDefault(); newJourney()
            "
          >
            <ion-icon name="add-circle-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen="true" color="burlywood">
      <app-journey-list
        [journeys]="service.journeys()"
        (edit)="editJourney($event)"
      ></app-journey-list>
      <ion-modal
        [isOpen]="openForm()"
        [canDismiss]="true"
        [presentingElement]="routerOutlet.nativeEl"
        (ionModalDidDismiss)="openForm.set(false)"
      >
        <ng-template>
          <app-journey-form
            [title]="title()"
            [journeyForm]="journeyForm"
            (results)="onSubmit($event)"
          ></app-journey-form>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
})
export class JourneyComponent {
  service = inject(JourneyStoryService);
  routerOutlet = inject(IonRouterOutlet);
  openForm = signal<boolean>(false);
  journey = signal<Journey | null>(null);

  private fb = inject(FormBuilder);
  journeyForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    note: [''],
  });

  edit = computed(() => !!this.journey());
  title = computed(() => (this.edit() ? 'Edit' : 'New'));

  constructor() {
    addIcons({ addCircleOutline });
    effect(() => {
      const journey = this.journey();

      if (journey) {
        this.journeyForm.patchValue({
          title: journey.title,
          note: journey.note,
        });
      }
    });
  }

  editJourney(journey: Journey) {
    console.log('Edit Journey');
    console.log(journey);
    this.journey.set(journey);
    this.openForm.set(true);
  }

  newJourney() {
    this.openForm.set(true);
    console.log('New Journey');
  }

  onSubmit(journey: AddJourney) {
    this.journey.set(null);
    this.openForm.set(false);
    console.log(`${this.title()} Journey`);
    console.log(journey);
  }
}
