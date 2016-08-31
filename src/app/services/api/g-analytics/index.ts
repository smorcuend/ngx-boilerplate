import { Injectable } from '@angular/core';

@Injectable()
export class GAnalyticsService {
  private _ga = window['ga'];
  private _tracking = true;

  constructor() {
    let cookieDomainValue = window.location.hostname === 'localhost' ? 'none' : 'auto';
    this._ga('create', window['_gaId'], { cookieDomain: cookieDomainValue });
    this.forceSend('pageview');
  }

  enable() {
    this._tracking = true;
  }
  disable() {
    this._tracking = false;
  }

  /**
   *
   * @param data {
   *   hitType: 'event',
   *   eventCategory: 'Videos',
   *   eventAction: 'play',
   *   eventLabel: 'Fall Campaign'
   * }
   *
   */
  send(data) {
    if (this._tracking) {
      this._send(data);
    }
  }

  forceSend(data) {
    this._send(data);
  }

  _send(data) {
    window['ga']('send', data);
  }
}
