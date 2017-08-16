import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

import { InventoryItemService } from '../service/inventory-item.service';
import { Room } from '../model/room';
import { InventoryItem } from '../model/inventory-item';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl'],
  host: {
    '(document:click)': 'outRoomClickListener($event)',
  },
  animations: [
    trigger('displaySearchBox', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('0.35s ease-in', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease-out', style({
            height: 0,
            opacity: 0
          })),
        ])
      ])
    ])
  ]
})


export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Output() newItemCreated = new EventEmitter();
  showSearchPanel = false;
  error: string;
  newItemName: string;
  newItemWidth: number;
  newItemLength: number;
  newItemHeight: number;
  showNewItemBox = false;
  takeMax = 9;

  /**
   * inventoryItemCollection effectively into the room object collection
   */
  get inventoryItemCollection(): InventoryItem[] {
        return this.room.searchingInventoryItemCollection.filter(item => item.quantity > 0);
    }
  constructor(private elementRef: ElementRef, private inventoryItemService: InventoryItemService) { }

  ngOnInit() {
  }

  outRoomClickListener(event) {

    let element: HTMLElement = event.target;
    while (element) {
      if (element.className.includes('search-panel')) {
        return;
      }
      element = element.parentElement;
    }
    this.showSearchPanel = false;
  }

  /**
   * display the search panel
   */
  activateSearchPanel() {
    this.showSearchPanel = true;
  }

  /**
   * check if one room can be displayed to the summary
   */
  get isOkForSummary() {
    return this.inventoryItemCollection.some(item => item.quantity > 0);
  }

  /**
   * Show or hide the new item box
   * @param show show or hide boolean
   */
  openCloseNewItemBox(show: boolean) {

    this.showNewItemBox = show;
    this.error = '';
    this.newItemName = '';
    this.newItemWidth = null;
    this.newItemLength = null;
    this.newItemHeight = null;

  }

  /**
   * 
   */
  createNewItem() {
    if (this.newItemName !== '' && this.verifNumbers()) {
      let tmpItem = this.inventoryItemService.createItem(
        this.newItemName,
        this.newItemLength,
        this.newItemWidth,
        this.newItemHeight
      );
      if (tmpItem) {
        this.openCloseNewItemBox(false);
        this.newItemCreated.next(tmpItem);
      } else {
        this.error = 'Impossible de créer l\'objet';
      }
    } else {
      this.error = 'Les valeurs indiqués ne sont pas conformes.'
    }
  }

  verifNumbers() {
    const values = [this.newItemHeight, this.newItemLength, this.newItemWidth];
    return (
      values.every(value => value > 0 && value !== null && isFinite(value))
    );
  }

}
