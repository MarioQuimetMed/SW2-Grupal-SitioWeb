import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
  },
  //   {
  //     path: 'contactanos',
  //     loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
  //   },
  //   {
  //     path: 'quienes-somos',
  //     loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
  //   },
  //   {
  //     path: 'precios',
  //     loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
  //   },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terms/terms').then((m) => m.Terms),
  },
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/policy/policy').then((m) => m.Policy),
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
