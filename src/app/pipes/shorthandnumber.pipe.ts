import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorthandnumber'
})
export class ShorthandnumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value / 1000000000.0 >= 1) {
      console.log('B');
      return ((value / 1000000000.0).toFixed(2) + 'B');
    }
    if (value / 1000000.0 >= 1) {
      return ((value / 1000000.0).toFixed(2) + 'M');
    }
    if (value / 10000.0 >= 1) {
      return ((value / 10000.0).toFixed(2) + 'K');
    }
    return value.toLocaleString();
  }

}
