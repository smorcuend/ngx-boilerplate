import { Injectable } from '@angular/core';
import { Api, ApiFactory } from '../api';

declare const userApi: string;

@Injectable()
export class UsersService {
  api: Api;
  entity: string;
  constructor(private _apiFactory: ApiFactory) {
    this.entity = 'users';
    this.api = _apiFactory.get(this.entity, userApi);
  }
}
