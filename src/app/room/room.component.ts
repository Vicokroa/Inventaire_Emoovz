import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

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
    ])
  ]
})


export class RoomComponent implements OnInit {
  @Input() room: Room;
  showSearchPanel = false;

  get inventoryItemCollection(): InventoryItem[] {
        return this.room.searchingInventoryItemCollection.filter(item => item.quantity > 0);
    }
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  outRoomClickListener(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSearchPanel = false;
      return;
    }
    let element: HTMLElement = event.target;
    while (element) {
      if (element.className === 'search-panel') {
        return;
      }
      element = element.parentElement;
    }
    this.showSearchPanel = false;
  }
  activateSearchPanel() {
    this.showSearchPanel = true;
  }

  get isOkForSummary() {
    return this.inventoryItemCollection.some(item => item.quantity > 0);
  }

}
