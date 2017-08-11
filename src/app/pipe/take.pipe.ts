import { Pipe, PipeTransform } from '@angular/core';

import { InventoryItem } from '../model/inventory-item';

@Pipe({
  name: 'take'
})
export class TakePipe implements PipeTransform {

  transform(value: any[] , args: number = 10): any[] {
    return value.slice(0, args);
  }

}
