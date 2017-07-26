import { Pipe, PipeTransform } from '@angular/core';

import { InventoryItem } from '../model/inventory-item';

@Pipe({
  name: 'itemSelected'
})
export class ItemSelectedPipe implements PipeTransform {

  transform(value: InventoryItem[], args?: any): any {
    const itemSelected = value.filter(item => item.quantity > 0);
    if (itemSelected && itemSelected.length > 0) {
      return itemSelected;
    }
    return [];
  }

}
