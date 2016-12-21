/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  styleUrls: ['./app.style.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './app.template.html'
})
export class App implements OnInit {

  appData = {
    appName: 'Angular2 Boilerplate by Seedtag',
    user: {}
  };

  preloading = true;

  constructor(
    private appState: AppState,
    private userInfoService: UserInfoService
  ) { }

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
