import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { AppState } from '../../app.service';
// import { ItemsService, UsersService, ProductsService, AlertsService } from '../../services';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // viewProviders: [ ItemsService, UsersService, ProductsService, AlertsService ],
})
export class DashboardComponent implements AfterViewInit {

  items: Object[];
  users: Object[];
  products: Object[];
  alerts: Object[];

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;

  // Set our default values
  localState = { value: '' };

  constructor(
    private appState: AppState,
    private _titleService: Title,
    private _loadingService: TdLoadingService
    ) {

  }

  ngOnInit() {
    this.appState.get();
  }


  ngAfterViewInit(): void {
    this._titleService.setTitle( 'Covalent Quickstart' );
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
