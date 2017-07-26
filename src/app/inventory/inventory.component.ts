import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

import { Room } from '../model/room';
import { InventoryItem } from '../model/inventory-item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.styl'],
  animations: [
    trigger('displayRoomInventory', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translateY(-100%)'
          })),
        ])
      ])
    ]),
    trigger('displayRoomDeleteBox', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translateX(-100%)'
          })),
        ])
      ])
    ])
  ]
})
export class InventoryComponent implements OnInit {
  @Input() addedRoomCollection: Room[];
  @Output() deleteRoom = new EventEmitter();
  @Output() newItemCreated = new EventEmitter();
  displayDeleteBox = false;


  constructor() { }

  ngOnInit() {
  }

  showHideRoomDeleteDialogBox(room: Room, show: boolean) {
      room.displayDeleteBox = show;
  }

  removeRoom(room: Room) {
    room.searchingInventoryItemCollection.forEach(inventoryItem => {
      inventoryItem.quantity = 0;
    });
    room.displayDeleteBox = false;
    this.deleteRoom.next(room);
  }

  showHide(room: Room) {
    if (!room.isFocused) {
    this.addedRoomCollection.forEach(_room => _room.isFocused = false);
    }
    room.isFocused = !room.isFocused;
  }

  passItemToParent(item: InventoryItem) {
    this.newItemCreated.next(item);
  }

}
