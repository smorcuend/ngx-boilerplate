import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.style.css'],
  templateUrl: './dashboard.template.html'
})
export class DashBoardComponent {
  // Set our default values
  localState = { value: '' };

  constructor(
    public appState: AppState
  ) { }

  ngOnInit() {
    this.appState.get();
  }


}
