export class InventoryItem {
    id: number;
    name: string;
    quantity: number;
    length: number;
    height: number;
    depth: number;
    custom = false;

    private _volume = 0;
    public get volume(): number {
        this._volume = Math.round((this.quantity * (this.height * this.length * this.depth / 1000000)) * 100) / 100;
        return this._volume;
    }

    constructor(id, name, quantity, length, height, depth) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.length = length;
        this.height = height;
        this.depth = depth;
    }

}
