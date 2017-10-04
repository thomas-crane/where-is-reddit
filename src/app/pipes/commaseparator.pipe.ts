import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaseparator'
})
export class CommaseparatorPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString();
  }

}
