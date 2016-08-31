import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.service';

interface TabItem {
  title: string;
  target: string;
  active?: boolean;
}

@Component({
  selector: 'dashboard',
  providers: [],
  styleUrls: ['./dashboard.style.css'],
  templateUrl: './dashboard.template.html'
})
export class DashboardComponent {
  // Set our default values
  localState = { value: '' };

  tabMenu: TabItem[];

  constructor(
    public appState: AppState
  ) { }

  ngOnInit() {
    this.appState.get();
    this.setTabs();
  }

  setTabs() {
    this.tabMenu = [
      {
        title: 'Item 1',
        target: 'item1',
        active: true
      },
      {
        title: 'Item 2',
        target: 'item2',
        active: false
      },
      {
        title: 'Item 3',
        target: 'item3',
        active: false
      },
      {
        title: 'Item 4',
        target: 'item4',
        active: false
      }
    ];
  }

  switchTab(itemActive) {
    this.tabMenu.forEach(item => item.active = false);
    itemActive.active = true;
  }

}
