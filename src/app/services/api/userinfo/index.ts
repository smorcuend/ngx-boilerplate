import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api, ApiFactory } from '../api';

declare const loginUrl: string;

@Injectable()
export class UserInfoService {
  entity: string;
  _api: Api;
  constructor(private _apiFactory: ApiFactory) {
    this.entity = 'userinfo';
    this._api = _apiFactory.get(this.entity, loginUrl);
  }
  get() {
    // return this._api.getAll();
    // Endpoint Mocked
    const promise = new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/mock-data/userinfo.json`);
      req.onload = (ev) => {
        const data = JSON.parse(req.responseText);
        resolve(data);
      };
      req.onerror = (err) => reject(err);
      req.send();
    });

    return new Observable(observer => {
      promise
        .then(data => observer.next(data))
        .catch(err => console.error(err));
    });

  }
}
