import { Component, OnInit } from '@angular/core';

import { Room } from './model/room';
import { InventoryItemService } from './service/inventory-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'Inventaire';
  roomCollection: Room[] = [];
  displayList = false;
  roomCollectionForInventory: Room[] = [];
  get roomCollectionForSummary(): Room[] {
    return this.roomCollectionForInventory.filter(_room => _room.itemQuantity > 0);
  }

  constructor(private inventoryService: InventoryItemService) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.inventoryService.getRooms()
      .then(rooms => {
        this.roomCollection = rooms;
        console.log('Rooms', rooms)
      })
      .catch(
        error => {
          this.roomCollection = [];
          console.error(error);
        }
      )
  }

  hideRoomList() {
    this.displayList = false;
  }

  toggleRoomList() {
    this.displayList = !this.displayList;
  }

  checkRoomForInventory(room: Room) {
    room.selected = !room.selected;
    if (room.selected) {
      room.isFocused = true;
      this.roomCollectionForInventory.forEach(_room => _room.isFocused = false);
      this.roomCollectionForInventory = [...this.roomCollectionForInventory, room];
    } else {
      this.roomCollectionForInventory.splice(this.roomCollectionForInventory.findIndex(_room => _room.id === room.id), 1);
    }
  }


}
