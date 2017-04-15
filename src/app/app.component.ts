import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { AppState } from './app.service';
import { UserInfoService } from './services/api/userinfo';

declare const loginUrl: string;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./app.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  appData = {
    appName: 'Angular Boilerplate',
    user: {}
  };

  preloading = true;

  constructor(
    private appState: AppState,
    private userInfoService: UserInfoService,
    private _iconRegistry: MdIconRegistry,
    private _domSanitizer: DomSanitizer,
  ) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);

    this.userInfoService.get().subscribe(data => {
      this.appData.user = data;
    });

    setTimeout(() => {
      this.preloading = false;
    }, 5000);

  }

}

