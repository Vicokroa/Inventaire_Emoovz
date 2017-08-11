import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../model/room';
import { InventoryItem } from '../model/inventory-item';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.styl']
})
export class SummaryComponent implements OnInit {
  @Input() roomCollection: Room[];
  get volume(): string {
    let totalVolume = 0;
    this.roomCollection.forEach(_room => totalVolume += (+_room.volume));
    return totalVolume.toFixed(2);
  }
  constructor() { }

  ngOnInit() {
  }

  /**
   * Decrease quantity of an inventoryItem for one room
   * @param room room to decrease inventoryItem quantity
   * @param inventoryItem inventory item to decrease quantity
   */
  removeOne(room: Room, inventoryItem: InventoryItem) {
    this.roomCollection.find(_room => _room.id === room.id)
    .inventoryItemCollection.find(_item => _item.id === inventoryItem.id).quantity--;
  }

  /**
   * Increase quantity of an inventoryItem for one room
   * @param room room to increase inventoryItem quantity
   * @param inventoryItem inventory item to increase quantity
   */
  addOne(room: Room, inventoryItem: InventoryItem) {
    this.roomCollection.find(_room => _room.id === room.id)
    .inventoryItemCollection.find(_item => _item.id === inventoryItem.id).quantity++;
  }

}
