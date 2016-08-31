import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressService {
  loadStartEventObservable: Subject<any>;
  loadEndEventObservable: Subject<any>;
  constructor() {
    this.loadStartEventObservable = new Subject();
    this.loadEndEventObservable = new Subject();
  }
}
