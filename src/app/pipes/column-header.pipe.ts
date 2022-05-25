import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'columnHeaderPipe'})
export class ColumnHeaderPipe implements PipeTransform {
  transform(value: any): any {
    let result = '';
    switch (value.toLowerCase()) {
      case 'uom':
        result = 'UOM';
        break;
      case 'prcode':
        result = 'PR Code';
        break;
      default:
        result = value.replace(/([a-z])([A-Z])/g, '$1 $2');
        result = result.replace(/-/g, ' ')
                     .split(' ')
                     .map((word: string) => {
                       return word.charAt(0).toUpperCase() + word.substr(1);
                     })
                     .join(' ');

        break;
    }
    return result;
  }
}
