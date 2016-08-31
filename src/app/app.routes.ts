import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layouts/home';
import { ProfileComponent } from './layouts/profile';
import { NoContentComponent } from './layouts/no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: '**', component: NoContentComponent },
];
