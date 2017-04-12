import { Component } from '@angular/core';

import { DashboardComponent } from './dashboard';
import { FeaturesComponent } from './features';
import { AboutComponent } from './about';
import { NoConnectionComponent }  from './no-connection';
import { NoContentComponent } from './no-content';

export const LAYOUT_DECLARATIONS: Component[] = [
  DashboardComponent,
  FeaturesComponent,
  AboutComponent,
  NoContentComponent,
  NoConnectionComponent
];
