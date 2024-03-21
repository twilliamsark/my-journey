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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, refreshOutline, close } from 'ionicons/icons';
import {
  SettingsState,
  SETTINGS_ORDER_VALUES,
} from 'src/app/shared/interfaces/settings';

@Component({
  selector: 'app-filter-form',
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
    IonSelect,
    IonSelectOption,
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
          <ion-button (click)="onCancelClick()">
            <ion-icon name="close" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Filter</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onResetClick()">
            <ion-icon name="refresh-outline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button (click)="onSaveClick()">
            <ion-icon name="save-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" color="burlywood">
      <form [formGroup]="filterForm">
        <ion-input
          label="Query"
          labelPlacement="floating"
          type="text"
          fill="solid"
          formControlName="query"
          mode="md"
        ></ion-input>
        <br />
        <ion-select
          label="Display Order"
          labelPlacement="floating"
          fill="solid"
          formControlName="order"
          mode="md"
        >
          @for (direction of directions; track direction) {
            <ion-select-option [value]="direction">
              {{ direction }}
            </ion-select-option>
          }
        </ion-select>
      </form>
    </ion-content>
  `,
})
export class FilterFormComponent {
  directions = SETTINGS_ORDER_VALUES;
  @Input({ required: true }) filterForm!: FormGroup;
  @Output() filter = new EventEmitter<SettingsState | null>();

  constructor() {
    addIcons({ saveOutline, refreshOutline, close });
  }

  onResetClick() {
    this.filterForm.reset({
      query: '',
      order: SETTINGS_ORDER_VALUES[1],
    });
  }

  onCancelClick() {
    this.filter.emit(null);
  }

  onSaveClick() {
    this.filter.emit(this.filterForm.getRawValue());
  }
}
