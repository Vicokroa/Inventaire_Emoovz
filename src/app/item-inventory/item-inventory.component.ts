import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

import { InventoryItem } from '../model/inventory-item';

@Component({
  selector: 'app-item-inventory',
  templateUrl: './item-inventory.component.html',
  styleUrls: ['./item-inventory.component.styl'],
  animations: [
    trigger('displayDeleteBox', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translateY(100%)'
          })),
        ])
      ])
    ])
  ]
})
export class ItemInventoryComponent implements OnInit {
  @Input() inventoryItem: InventoryItem;
  displayDeleteBox = false;
  private previousQuantity = 0;

  constructor() { }

  ngOnInit() {
  }

  addElement(event) {
    console.log('Add elemnt', typeof (this.inventoryItem.quantity));
    event.stopPropagation();
    this.inventoryItem.quantity++;
  }

  deleteConfirm(event) {
    event.stopPropagation();
    this.displayDeleteBox = false;
    this.inventoryItem.quantity = 0;
  }

  deleteCancel(event) {
    event.stopPropagation();
    this.displayDeleteBox = false;
  }

  removeElement(event) {
    event.stopPropagation();
    console.log('Remove elemnt', typeof (this.inventoryItem.quantity));
    if (this.inventoryItem.quantity === 1) {
      this.displayDeleteBox = true;
    } else if (this.inventoryItem.quantity > 1) {
      this.inventoryItem.quantity--;
    }

  }

  inputEnter() {
    // this.previousQuantity = this.inventoryItem.quantity;
    console.log('input enter', typeof (this.inventoryItem.quantity));
  }

  inputOut() {
    console.log('input out', typeof (this.inventoryItem.quantity));
    // if (isNaN(this.inventoryItem.quantity)) {
      // this.inventoryItem.quantity = this.previousQuantity;
    // }
  }
}
