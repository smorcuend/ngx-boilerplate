import { Component } from '@angular/core';

import { HomeComponent } from './home';
import { DashboardComponent } from './dashboard';
import { ProfileComponent } from './profile';
import { NoConnectionComponent }  from './no-connection';
import { NoContentComponent } from './no-content';

export const LAYOUT_DECLARATIONS: Component[] = [
  HomeComponent,
  DashboardComponent,
  ProfileComponent,
  NoContentComponent,
  NoConnectionComponent
];
