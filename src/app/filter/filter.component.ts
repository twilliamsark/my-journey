import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterFormComponent } from './ui/filter-form.component';
import { SettingsStoreService } from '../shared/services/settings/settings.store.service';
import { SettingsState } from '../shared/interfaces/settings';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FilterFormComponent],
  template: `
    <app-filter-form [filterForm]="filterForm" (filter)="onSave($event)" />
  `,
})
export class FilterComponent {
  private fb = inject(FormBuilder);
  private store = inject(SettingsStoreService);
  private router = inject(Router);
  filterForm = this.fb.nonNullable.group({
    order: this.store.order(),
    query: this.store.query(),
  });

  onSave(settings: SettingsState | null) {
    if (settings) {
      this.store.newOrder$.next(settings.order);
      this.store.newQuery$.next(settings.query);
    }
    this.router.navigate(['/']);
  }
}
