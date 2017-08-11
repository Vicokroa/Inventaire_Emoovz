export class InventoryItem {
    id: number;
    name: string;
    quantity: number;
    length: number;
    height: number;
    depth: number;
    custom = false;

    private _volume = 0;
    /**
     * get total volume
     */
    public get volume(): number {
        // cm3 => m3 alors division par 1 000 000
        this._volume = Math.round((this.quantity * (this.height * this.length * this.depth / 1000000)) * 100) / 100;
        return this._volume;
    }

    /**
     * Create one inventory item
     * @param id Unique id of InventoryItem
     * @param name Name of InventoryItem
     * @param quantity Quantity of InventoryItem
     * @param length length of one inventoryItem
     * @param height height of inventoryitem
     * @param depth depth of one inventory item
     */
    constructor(id, name, quantity, length, height, depth) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.length = length;
        this.height = height;
        this.depth = depth;
    }

}
