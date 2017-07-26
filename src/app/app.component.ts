import { Component, OnInit } from '@angular/core';

import { Room } from './model/room';
import { InventoryItem } from './model/inventory-item';
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
  showAddRoomDialog = false;
  newRoom: string;
  roomCollectionForInventory: Room[] = [];
  get roomCollectionForSummary(): Room[] {
    return this.roomCollectionForInventory.filter(_room => _room.displayToSummary);
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
    this.newRoom = '';
  }

  toggleRoomList() {
    this.displayList = !this.displayList;
    this.newRoom = '';
    this.showAddRoomDialog = false;
  }

  showRoomDialog() {
    this.showAddRoomDialog = true;
    this.newRoom = '';
  }

  validateNewRoom() {
    if (this.newRoom !== '') {
      let tmpRoom = this.inventoryService.createRoom(this.roomCollection.length + 1, this.newRoom);
      this.roomCollection = [...this.roomCollection, tmpRoom];
      this.checkRoomForInventory(tmpRoom);
      this.showAddRoomDialog = false;
      this.newRoom = '';
    }
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

  addNewItemToRoom(item: InventoryItem) {
    this.roomCollection.forEach(room => {
      room.searchingInventoryItemCollection = [item, ...room.searchingInventoryItemCollection];
    });
  }


}
