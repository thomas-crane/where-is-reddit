import { Pipe, PipeTransform } from '@angular/core';

/**
 * Converts the number to a comma separated string.
 * Usage:
 *  value | commaseparator
 * Example:
 *  {{ 12423 | commaseparator }}
 *  formats to: 12,423
 */
@Pipe({
  name: 'commaseparator'
})
export class CommaseparatorPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString();
  }

}
