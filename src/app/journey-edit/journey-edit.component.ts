import {
  Component,
  Input,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular/standalone';

import { isEmptyString } from '../shared/utils';
import { JourneyStoryService } from '../shared/services/journey.store.service';
import { AddJourney, EditJourney } from '../shared/interfaces/journey';
import { JourneyEditFormComponent } from './ui/journey-edit-form.component';

@Component({
  selector: 'app-journey-edit',
  standalone: true,
  imports: [IonModal, JourneyEditFormComponent],
  template: `
    <ion-modal [isOpen]="isModalOpen">
      <ng-template>
        <app-journey-edit-form
          [journeyForm]="editForm"
          (journey)="onClose($event)"
        ></app-journey-edit-form>
      </ng-template>
    </ion-modal>
  `,
})
export class JourneyEditComponent {
  @ViewChild(IonModal) modal!: IonModal;
  service = inject(JourneyStoryService);
  router = inject(Router);
  isModalOpen = false;

  journeyId = signal<string>('');
  @Input() set id(value: string) {
    this.journeyId.set(value);
  }

  newJourney = computed(() => isEmptyString(this.journeyId()));
  journeyToBeEdited = signal<EditJourney | null>(null);

  private fb = inject(FormBuilder);
  editForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    note: [''],
  });

  constructor() {
    effect(() => {
      const edit = !this.newJourney();

      if (edit) {
        const journey = this.service
          .journeys()
          .find((journey) => journey.id === this.journeyId());

        if (journey) {
          this.editForm.patchValue({
            title: journey.title,
            note: journey.note,
          });

          // this.journeyToBeEdited.set({
          //   id: this.journeyId(),
          //   data: { title: journey.title, note: journey.note },
          // });
        }
      }
      this.isModalOpen = true;
    });
  }

  onClose(journey: AddJourney | null) {
    if (journey) {
      console.log({
        id: this.journeyId(),
        data: { title: journey.title, note: journey.note },
      });
    }
    this.modal.dismiss();
    this.router.navigate(['/']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }
}
