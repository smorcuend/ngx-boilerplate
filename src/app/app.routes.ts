import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';

import { MainComponent } from './layouts/main';
import { DashboardComponent } from './layouts/dashboard';

import { FeaturesComponent } from './layouts/features';
import { AboutComponent } from './layouts/about';
import { NoContentComponent } from './layouts/no-content';

const appRoutes: Routes = [

  {
    path: '', component: MainComponent, children: [
      {
        component: DashboardComponent,
        path: '',
      }
    ]
  },

  { path: 'about', component: AboutComponent },
  // Default view on root route
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
