import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'journey',
    loadComponent: () =>
      import('./journey/journey.component').then((m) => m.JourneyComponent),
  },
  {
    path: 'journey/edit/:id',
    loadComponent: () =>
      import('./journey-edit/journey-edit.component').then(
        (m) => m.JourneyEditComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'journey',
    pathMatch: 'full',
  },
];
