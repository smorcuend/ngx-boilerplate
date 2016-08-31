import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';

interface Entity {
  instance: Api;
  entity: string;
}

@Injectable()
export class ApiFactory {
  private entityList: Array<Entity>;
  constructor(private _http: Http) {
    this.entityList = [];
  }
  get(entity: string, apiUrl?: string): Api {
    const entityEl = this.entityList.find(entityItem => entityItem.entity === entity);
    if (entityEl) {
      return entityEl.instance;
    }
    const obj = {
      entity,
      instance: new Api(entity, apiUrl, this._http)
    };
    this.entityList.push(obj);
    return obj.instance;
  }
}

@Injectable()
export class Api {

  baseUrl: string;
  entity: string;
  headers: Headers;

  constructor(entity: string, apiBase: string, private _http: Http) {
    this.entity = entity;
    this.setBaseUrl(apiBase);
    this.setDefaultHeaders();
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  };
  public setBaseUrl(url: string) {
    this.baseUrl = `${url}/${this.entity}`;
  };

  /* REST Interface */
  public create(body): Observable<Response> {
    return this._http.post(
      `${this.baseUrl}`,
      JSON.stringify(body),
      { headers: this.getDefaultHeaders() }
    );
  }
  public get(id): Observable<Response> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  public getAll(): Observable<Response> {
    return this._http.get(`${this.baseUrl}`);
  }
  public find(query: any): Observable<Response> {
    return this._http.get(`${this.baseUrl}?filter=${encodeURI(JSON.stringify(query))}`);
  }
  public filter(query: any): Observable<Response> {
    let tmpQuery = '';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        tmpQuery += `filter_${key}=${query[key]}&`;
      }
    }
    return this._http.get(`${this.baseUrl}?${tmpQuery}`);
  }
  public filterRaw(query: any): Observable<Response> {
    let tmpQuery = '';
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        tmpQuery += `${key}=${query[key]}&`;
      }
    }
    return this._http.get(`${this.baseUrl}?${tmpQuery}`);
  }
  public findOne(query: any): Observable<Response> {
    return this._http.get(`${this.baseUrl} /findOne?filter=${encodeURI(JSON.stringify(query))}`);
  }
  public delete(id): Observable<Response> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  public update(id, body): Observable<Response> {
    return this._http.put(
      `${this.baseUrl}/${id}`,
      JSON.stringify(body),
      { headers: this.getDefaultHeaders() }
    );
  }
  public updateResource(id, params): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData: FormData = new FormData();
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.withCredentials = true;
      for (let param in params) {
        if (params.hasOwnProperty(param)) {
          let value = params[param];
          if (param === 'value') value = JSON.stringify(params[param]);
          formData.append(param, value);
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      // xhr.upload.onprogress = (event) => { };
      xhr.open('POST', `${this.baseUrl}/${id}/update_resource`, true);
      xhr.send(formData);
    });
  }
  public removeResource(id, params): Observable<Response> {
    return this._http.post(
      `${this.baseUrl}/${id}/delete_resource`,
      JSON.stringify(params),
      { headers: this.getDefaultHeaders() }
    );
  }

  private getDefaultHeaders(): Headers {
    return this.headers;
  };
  private setDefaultHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  };

}
