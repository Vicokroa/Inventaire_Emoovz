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

  /**
   * increase by 1 an element quantity
   * @param event event to stop
   */
  addElement(event) {
    event.stopPropagation();
    this.inventoryItem.quantity++;
  }

  /**
   * set to 0 item quantity
   * @param event event to stop
   */
  deleteConfirm(event) {
    event.stopPropagation();
    this.displayDeleteBox = false;
    this.inventoryItem.quantity = 0;
  }

  /**
   * abort delete action
   * @param event event to stop
   */
  deleteCancel(event) {
    event.stopPropagation();
    this.displayDeleteBox = false;
  }

  /**
   * decrease by 1 an element quantity
   * @param event event to stop
   */
  removeElement(event) {
    event.stopPropagation();
    if (this.inventoryItem.quantity === 1) {
      this.displayDeleteBox = true;
    } else if (this.inventoryItem.quantity > 1) {
      this.inventoryItem.quantity--;
    }

  }

  /**
   * action to do on focusin quantity input
   */
  inputEnter() {
    this.previousQuantity = this.inventoryItem.quantity;
  }

  /**
   * action to do on focusout quantity input
   */
  inputOut() {
    if (isNaN(this.inventoryItem.quantity)) {
      this.inventoryItem.quantity = this.previousQuantity;
    }
  }
}
