import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, searchOutline } from 'ionicons/icons';

import { JourneyStoryService } from '../shared/services/journey/journey.store.service';
import { Journey } from '../shared/interfaces/journey';
import { JourneyListComponent } from './ui/journey-list.component';

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
    JourneyListComponent,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="blanchedalmond">
        <ion-title>My Journey</ion-title>
        <ion-buttons slot="end">
          <ion-button
            (click)="
              $event.stopPropagation(); $event.preventDefault(); newFilter()
            "
          >
            <ion-icon name="search-outline" slot="icon-only"></ion-icon>
          </ion-button>
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
    </ion-content>
  `,
})
export class JourneyComponent {
  service = inject(JourneyStoryService);
  routerOutlet = inject(IonRouterOutlet);
  router = inject(Router);
  openForm = signal<boolean>(false);
  journey = signal<Journey | null>(null);

  edit = computed(() => !!this.journey());
  title = computed(() => (this.edit() ? 'Edit' : 'New'));

  constructor() {
    addIcons({ addCircleOutline, searchOutline });
  }

  editJourney(journey: Journey) {
    this.router.navigate(['/journey/edit', journey.id]);
  }

  newJourney() {
    this.router.navigate(['/journey/edit', '']);
  }

  newFilter() {
    this.router.navigate(['/filter']);
  }
}
