import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smMapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
  transform(dict: Object): Array<any> {
    let a = [];
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({ key: key, val: dict[key] });
      }
    }
    return a;
  }
}
