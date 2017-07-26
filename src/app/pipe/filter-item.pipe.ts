import { Pipe, PipeTransform } from '@angular/core';
import { InventoryItem } from '../model/inventory-item';

@Pipe({
  name: 'filterItem'
})
export class FilterItemPipe implements PipeTransform {

  /**
   * Filter InventoryItem collection from query input
   * @param  {InventoryItem[]} value Source InventoryItem to filter
   * @param  {string}          query query filter
   * @return {InventoryItem[]}       Return InventoryItemCollection filtred
   */
  transform(value: InventoryItem[], query: string): InventoryItem[] {
    if (query) {
      return value.filter(
        item => item.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return value;
    }
  }

}
