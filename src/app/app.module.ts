import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BrowserXhr, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
// Vendors
import { VENDOR_DECLARATIONS, VENDOR_MODULES } from './app.vendors';

// Services
import { API_PROVIDERS } from './services/api';
import { NETWORK_PROVIDERS } from './services/network';
import { HttpInterceptor } from './services/network/http-interceptor';
import { CustomBrowserXhr } from './services/network/custom-browser-xhr';

// Pipes
import { PIPE_DECLARATIONS } from './pipes';

// Layouts
import { LAYOUT_DECLARATIONS } from './layouts';

// Components
import { COMPONENT_DECLARATIONS } from './components';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  ...API_PROVIDERS,
  ...NETWORK_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    // Vendors
    ...VENDOR_DECLARATIONS,
    // Pipes
    ...PIPE_DECLARATIONS,
    ...LAYOUT_DECLARATIONS,
    ...COMPONENT_DECLARATIONS
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: BrowserXhr,
      useClass: CustomBrowserXhr
    },
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) =>
        new HttpInterceptor(xhrBackend, requestOptions, router),
      deps: [XHRBackend, RequestOptions, Router]
    }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
