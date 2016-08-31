import {
  Http, Request, RequestOptionsArgs, Response,
  XHRBackend, RequestOptions, ConnectionBackend, Headers
} from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

declare const loginUrl: string;

@Injectable()
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!!options) {
      options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
    }
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401 || err.status === 403) {
        this._router.navigate(['no-connection']);
        return Observable.empty();
      }
      if (err.status === 500 || err.status === 502 || err.status === 504) {
        this._router.navigate(['no-connection']);
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });
  }
}
