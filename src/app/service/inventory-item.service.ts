import { Injectable } from '@angular/core';

import { InventoryItem } from '../model/inventory-item';
import { Room } from '../model/room';

const INVENTORYITEMS: InventoryItem[] = [
  new InventoryItem(11, 'Chaise Longue', 0, 40, 40, 60),
  new InventoryItem(12, 'Chaise de bureau', 0, 40, 40, 60),
  new InventoryItem(13, 'Chaise de cuisine', 0, 40, 40, 60),
  new InventoryItem(14, 'Chaise simple', 0, 40, 40, 60),
  new InventoryItem(15, 'Bureau', 0, 40, 40, 60),
  new InventoryItem(16, 'Table basse', 0, 40, 40, 60),
  new InventoryItem(17, 'Casiers ou tout plein d\'autres trucs', 0, 40, 40, 60),
  new InventoryItem(18, 'Lit simple', 0, 40, 40, 60),
  new InventoryItem(19, 'Lit double', 0, 40, 40, 60),
  new InventoryItem(20, 'Lave-linge', 0, 40, 40, 60),
  new InventoryItem(21, 'Meulbe bas', 0, 63, 52, 31)
];


const ROOMS: Room[] = [
  new Room(1, 'Salon', []),
  new Room(2, 'Cuisine', []),
  new Room(3, 'Bureau', []),
  new Room(4, 'Chambre', [])
];


@Injectable()
export class InventoryItemService {

  /**
   * Calcul du volume d'une collection d'item
   * @param  {InventoryItem[]} items Collection d'item d'entrée dont le Volume doit être retourné
   * @return {number}                Retroune le volume total de la collection
   */
  getVolume(items: InventoryItem[]): number {
    let result = 0;
    items.forEach(item => result += item.volume);
    return result;
  }

  /**
   * Retourne la collection des Items
   */
  getInventoryItems(): Promise<InventoryItem[]> {
    return Promise.resolve(INVENTORYITEMS);
  }

  /**
   * Retourne la collection des pièces
   */
  getRooms(): Promise<Room[]> {
    const tmpRooms = ROOMS;
    tmpRooms.forEach(room => room.searchingInventoryItemCollection = this.copy(INVENTORYITEMS));
    return Promise.resolve(tmpRooms);
  }

  /**
   * Fonction de copy d'un collection d'item
   * @param inventory {InventoryItem[]} Collection d'items à copier
   */
  copy(inventory: InventoryItem[]): InventoryItem[] {
    const result = []
    inventory.forEach(item =>
      result.push(new InventoryItem(item.id, item.name, item.quantity, item.length, item.height, item.depth))
    );

    return result;
  }


}
