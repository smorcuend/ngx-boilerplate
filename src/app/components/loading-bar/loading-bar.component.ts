import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ProgressService } from '../../services/network/progress';
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

require('ng2-slim-loading-bar/style.css');

@Component({
  providers: [SlimLoadingBarService],
  selector: 'loading-bar',
  template:
  '<ng2-slim-loading-bar [height]="\'5px\'" [color]="\'firebrick\'"></ng2-slim-loading-bar>',
})
export class LoadingBarComponent implements OnInit, OnDestroy {

  private subscriptionLoadStart: any;
  private subscriptionLoadEnd: any;

  private eventsPipe: any[];
  private isLoading: boolean = false;

  constructor(
    public el: ElementRef,
    private progressService: ProgressService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.eventsPipe = [];
  }

  eventAggregattor(ev) {
    if (ev.type === 'loadstart') {
      this.eventsPipe.push(1);
      this.playLoadingAnimation();
    } else {
      this.eventsPipe.pop();
      if (this.eventsPipe.length === 0) {
        this.stopLoadingAnimation();
      }
    }
  }

  playLoadingAnimation() {
    if (this.isLoading) {
      this.slimLoadingBarService.progress += 10;
      return true;
    }
    this.slimLoadingBarService.start(() => {
      this.isLoading = true;
    });
  }
  stopLoadingAnimation() {
    this.slimLoadingBarService.complete();
    this.isLoading = false;
  }

  ngOnInit() {
    this.subscriptionLoadStart = this.progressService.loadStartEventObservable.subscribe(
      loading => this.eventAggregattor(loading)
    );

    this.subscriptionLoadEnd = this.progressService.loadEndEventObservable.subscribe(
      loading => this.eventAggregattor(loading)
    );
  }
  ngOnDestroy() {
    this.subscriptionLoadStart.unsubscribe();
    this.subscriptionLoadEnd.unsubscribe();
  }

}
