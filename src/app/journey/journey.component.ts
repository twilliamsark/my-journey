import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { JourneyStoryService } from '../shared/services/journey.store.service';
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
          <ion-button>
            <ion-icon name="add-circle-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen="true" color="burlywood">
      <app-journey-list [journeys]="service.journeys()"></app-journey-list>
    </ion-content>
  `,
})
export class JourneyComponent {
  service = inject(JourneyStoryService);

  constructor() {
    addIcons({ addCircleOutline });
  }
}
