import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
import { ProgressService } from '../progress';

@Injectable()
export class CustomBrowserXhr {
  browserXhr: BrowserXhr;
  constructor(private progressService: ProgressService) {
    this.browserXhr = new BrowserXhr();
  }
  build(): any {
    let xhr = this.browserXhr.build();
    xhr.withCredentials = true;
    xhr.onloadstart = (event) => {
      this.progressService.loadStartEventObservable.next(event);
    };
    xhr.onloadend = (event) => {
      this.progressService.loadEndEventObservable.next(event);
    };
    return <any>(xhr);
  }
}
