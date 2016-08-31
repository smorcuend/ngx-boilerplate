import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InteralStateType = {};

  public appStateObservable: Subject<any>;

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
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    this._state[prop] = value;
    this.appStateObservable.next(this._state['appData']); // Notify appState change
    return this._state[prop] = value;
  }


  private _clone(object: InteralStateType) {
    // simple object clone
    return Object.assign({}, object);
  }
}
