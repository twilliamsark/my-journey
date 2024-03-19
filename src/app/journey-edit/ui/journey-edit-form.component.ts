import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, close } from 'ionicons/icons';

import { AddJourney } from 'src/app/shared/interfaces/journey';

@Component({
  selector: 'app-journey-edit-form',
  standalone: true,
  imports: [
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonInput,
    IonTextarea,
    ReactiveFormsModule,
    RouterModule,
  ],
  styles: `
    :host {
      height: 100%;
    }
  `,
  template: `
    <ion-header>
      <ion-toolbar color="blanchedalmond">
        <ion-buttons slot="start">
          <ion-button (click)="journey.emit(null)">
            <ion-icon slot="icon-only" name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button
            [disabled]="!journeyForm.valid"
            (click)="journey.emit(journeyForm.getRawValue())"
          >
            <ion-icon slot="icon-only" name="save-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" color="burlywood">
      <form [formGroup]="journeyForm">
        <ion-input
          label="Title"
          labelPlacement="floating"
          type="text"
          fill="solid"
          formControlName="title"
          mode="md"
        ></ion-input>
        <br />
        <ion-textarea
          label="Note"
          labelPlacement="floating"
          fill="solid"
          [autoGrow]="true"
          formControlName="note"
          mode="md"
        ></ion-textarea>
      </form>
    </ion-content>
  `,
})
export class JourneyEditFormComponent {
  @Input({ required: true }) journeyForm!: FormGroup;
  @Output() journey = new EventEmitter<AddJourney | null>();

  constructor() {
    addIcons({ saveOutline, close });
  }
}
