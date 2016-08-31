import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';

declare const loginUrl: string;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.template.html'
})
export class NavbarComponent implements OnInit {

  username: string;
  userInfo: any;
  loginUrl: string;

  logoutUrl: string;

  constructor(
    private appState: AppState,
    private _router: Router
  ) {
    this.username = 'Anonymous';
    this.userInfo = null;
    this.loginUrl = loginUrl;
    this.logoutUrl = `${loginUrl}/logout?redirect_url=${window.location.origin}`;
  }

  setAppData() {
    this.appState.appStateObservable.subscribe(appData => {
      if (appData && appData.user) {
        this.userInfo = appData.user;
        this.username = appData.user.username;
      }
    });

    if (this.userInfo) {
      this.username = this.appState.get('appData').user.username;
    }

  }

  ngOnInit() {
    this.setAppData();
  }

}
