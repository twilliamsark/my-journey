import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'journey',
    loadComponent: () =>
      import('./journey/journey.component').then((m) => m.JourneyComponent),
  },
  {
    path: '',
    redirectTo: 'journey',
    pathMatch: 'full',
  },
];
