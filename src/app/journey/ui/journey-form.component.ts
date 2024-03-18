import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea,
  ModalController,
} from '@ionic/angular/standalone';
import { AddJourney, Journey } from 'src/app/shared/interfaces/journey';

@Component({
  standalone: true,
  selector: 'app-journey-form',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonTextarea,
    ReactiveFormsModule,
  ],
  styles: `
    ion-label {
      font-weight: bold;
    }
  `,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            (click)="
              $event.stopPropagation(); $event.preventDefault(); onCancel()
            "
            >Cancel</ion-button
          >
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button
            (click)="
              $event.stopPropagation(); $event.preventDefault(); onSave()
            "
            [strong]="true"
            [disabled]="!journeyForm.valid"
          >
            Save
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form [formGroup]="journeyForm">
        <ion-item>
          <ion-label>Title</ion-label>
          <ion-input
            class="cedarville-cursive"
            type="text"
            formControlName="title"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Note</ion-label>
          <ion-textarea
            class="cedarville-cursive"
            formControlName="note"
          ></ion-textarea>
        </ion-item>
      </form>
    </ion-content>
  `,
})
export class JourneyFormComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) journeyForm!: FormGroup;
  @Output() results = new EventEmitter<AddJourney>();

  private modalCtrl = inject(ModalController);

  onSave() {
    console.log(`${this.title} save`);
    console.log(this.journeyForm.getRawValue());
    this.results.emit(this.journeyForm.getRawValue());
    this.dismiss();
  }

  onCancel() {
    console.log('cancel');
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
