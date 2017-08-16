import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Room } from './model/room';
import { InventoryItem } from './model/inventory-item';
import { InventoryItemService } from './service/inventory-item.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 250) {
        $('.summary-section').addClass('fixedSummary');
      } else {
        $('.summary-section').removeClass('fixedSummary');
      }
    })
  }

  /**
   * Force room list to hide
   */
  hideRoomList() {
    this.displayList = false;
    this.newRoom = '';
  }

  /**
   * Toggle between show or hide the room list
   */
  toggleRoomList() {
    this.displayList = !this.displayList;
    this.newRoom = '';
    this.showAddRoomDialog = false;
  }

  /**
   * Show the new room dialog
   */
  showRoomDialog() {
    this.showAddRoomDialog = true;
    this.newRoom = '';
  }

  /**
   * Validate and create the new room
   */
  validateNewRoom() {
    if (this.newRoom !== '') {
      let tmpRoom = this.inventoryService.createRoom(this.roomCollection.length + 1, this.newRoom);
      this.roomCollection = [...this.roomCollection, tmpRoom];
      this.checkRoomForInventory(tmpRoom);
      this.showAddRoomDialog = false;
      this.newRoom = '';
    }
  }

  /**
   * Add room to the inventory room collection
   * @param room room to add
   */
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

  /**
   * add new created item to room inventoryitem collection
   * @param item item to add
   */
  addNewItemToRoom(item: InventoryItem) {
    this.roomCollection.forEach(room => {
      room.searchingInventoryItemCollection = [
        new InventoryItem(item.id, item.name, item.quantity, item.length, item.height, item.depth),
         ...room.searchingInventoryItemCollection];
    });
  }


}
