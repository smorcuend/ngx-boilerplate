import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataResolver } from './app.resolver';

import { DashBoardComponent } from './layouts/dashboard';
import { FeaturesComponent } from './layouts/features';
import { AboutComponent } from './layouts/about';
import { NoContentComponent } from './layouts/no-content';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'about', component: AboutComponent },
  // Default view on root route
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NoContentComponent },
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
