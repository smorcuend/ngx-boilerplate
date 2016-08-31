import { Component } from '@angular/core';

@Component({
  selector: 'no-connection',
  template: `
    <div class="p-50">
      <h1>We are experimenting network problems. Try again after a few minutes.</h1>
    </div>
  `
})
export class NoConnectionComponent { }
