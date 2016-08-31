import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.service';

@Component({
  selector: 'home',
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.style.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };

  constructor(
    public appState: AppState
  ) { }

  ngOnInit() {
    this.appState.get();
  }

}
