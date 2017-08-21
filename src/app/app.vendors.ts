import 'hammerjs';

import { NgModule, Type, Component } from '@angular/core';

import { MaterialModule } from '@angular/material';
import {
  CovalentStepsModule,
  CovalentLoadingModule,
  CovalentLayoutModule,
  TdLoadingService
} from '@covalent/core';
import { TdLoadingFactory } from '@covalent/core/loading/services/loading.factory';

import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';

export const MATERIAL_IMPORTS = [
  CovalentLoadingModule
];

export const MATERIAL_PROVIDERS = [
  TdLoadingService,
  TdLoadingFactory
];

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

// Vendors
export const VENDOR_DECLARATIONS: Component[] = [

];

export const VENDOR_MODULES: NgModule[] = [
    MaterialModule,
    CovalentStepsModule,
    CovalentLayoutModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    NgxChartsModule
];

export const VENDOR_PROVIDERS: any[] = [
    httpInterceptorProviders
];
