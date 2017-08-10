import { Injectable } from '@angular/core';

import { InventoryItem } from '../model/inventory-item';
import { Room } from '../model/room';

let INVENTORYITEMS: InventoryItem[] = [
  new InventoryItem(1, 'Chaise Longue', 0, 40, 40, 60),
  new InventoryItem(2, 'Chaise de bureau', 0, 40, 40, 60),
  new InventoryItem(3, 'Chaise de cuisine', 0, 40, 40, 60),
  new InventoryItem(4, 'Chaise simple', 0, 40, 40, 60),
  new InventoryItem(5, 'Bureau', 0, 40, 40, 60),
  new InventoryItem(6, 'Table basse', 0, 40, 40, 60),
  new InventoryItem(7, 'Casiers ou tout plein d\'autres trucs', 0, 40, 40, 60),
  new InventoryItem(8, 'Lit simple', 0, 40, 40, 60),
  new InventoryItem(9, 'Lit double', 0, 40, 40, 60),
  new InventoryItem(10, 'Grand carton', 0, 55, 35, 30),
  new InventoryItem(11, 'Petit carton', 0, 35, 27.5, 30),
  new InventoryItem(12, 'Canapé 2 places', 0, 63, 52, 31),
  new InventoryItem(13, 'Canapé 3 places', 0, 63, 52, 31),
  new InventoryItem(14, 'Canapé d\'angle', 0, 63, 52, 31),
  new InventoryItem(15, 'Clic-clac', 0, 63, 52, 31),
  new InventoryItem(16, 'Table 2-4 personnes', 0, 63, 52, 31),
  new InventoryItem(16, 'Table 6-8 personnes', 0, 63, 52, 31),
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

  createRoom(id: number, name: string): Room {
    const tmpRoom = new Room(id, name, []);
    tmpRoom.searchingInventoryItemCollection = this.copy(INVENTORYITEMS);
    return tmpRoom;
  }

  createItem(name: string, length: number, width: number, height: number) : InventoryItem {
    INVENTORYITEMS = [new InventoryItem(
      INVENTORYITEMS.length + 1,
      name,
      0,
      length,
      height,
      width
    ) , ...INVENTORYITEMS]
    return INVENTORYITEMS[0];
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
