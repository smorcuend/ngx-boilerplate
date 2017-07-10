import 'hammerjs';

import { NgModule, Type, Component } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { CovalentCoreModule, CovalentLayoutModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

// Vendors
export const VENDOR_DECLARATIONS: Component[] = [

];

export const VENDOR_MODULES: NgModule[] = [
    MaterialModule,
    CovalentCoreModule,
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
