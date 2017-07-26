import { InventoryItem } from './inventory-item';

export class Room {
    id: number;
    name: string;
    searchingInventoryItemCollection: InventoryItem[];
    get inventoryItemCollection(): InventoryItem[] {
        return this.searchingInventoryItemCollection.filter(item => item.quantity > 0);
    }
    selected = false;
    isFocused = false;
    displayDeleteBox = false;

    private _volume = '0';
    public get volume(): string {
        let result = 0;
        this.searchingInventoryItemCollection.forEach(item => {
            result += item.volume;
        });
        this._volume = result.toFixed(2);
        return this._volume;

    }

    private _itemQuantity = 0
    public get itemQuantity(): number {

        this._itemQuantity = 0;
        this.searchingInventoryItemCollection.forEach(item => {
            this._itemQuantity += item.quantity;
        });
        return this._itemQuantity;
    }

    private _DisplayToResume = false;
    public get displayToResume(): boolean {
        this._DisplayToResume = this.searchingInventoryItemCollection.some(item => item.quantity > 0);
        return this._DisplayToResume;
    }

    private _inventoryForResume: InventoryItem[];
    public get inventoryForResume(): InventoryItem[] {
        this._inventoryForResume = this.searchingInventoryItemCollection.filter(item => item.quantity > 0);
        return this._inventoryForResume;
    }


    constructor(id: number, name: string, inventoryItems: InventoryItem[]) {
        this.id = id;
        this.name = name;
        this.searchingInventoryItemCollection = inventoryItems;
    }
}
