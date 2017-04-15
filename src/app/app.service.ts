import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public appStateObservable: Subject<any>;
  _state: InteralStateType = {};

  constructor() {
    this.appStateObservable = new Subject();
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    return this.state.hasOwnProperty(prop) ? this.state[prop] : null;
  }

  get$(key: string) {
    return this.appStateObservable
      .startWith(this._state[key])
      .map(() => this._state[key]);
  }

  set(prop: string, value: any) {
    // internally mutate our state
    this._state[prop] = value;
    this.appStateObservable.next({ key: prop, value: this._state[prop] }); // Notify appState change
    return this._state[prop];
  }

  private _clone(object: InteralStateType) {
    // simple object clone
    return Object.assign({}, object);
  }
}
