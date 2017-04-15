import { Component, NgModule } from '@angular/core';

import { MainComponent } from './main';

import { DashboardComponent } from './dashboard';
import { AboutComponent } from './about';
import { NoConnectionComponent }  from './no-connection';
import { NoContentComponent } from './no-content';

export const LAYOUT_COMPONENTS: Component[] = [
  MainComponent,
  DashboardComponent,
  AboutComponent,
  NoContentComponent,
  NoConnectionComponent
];

export const LAYOUT_MODULES: NgModule[] = [

];
