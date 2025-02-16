export class Product {
    constructor(
        public name: string,
        public quantity: number,
        public price: number
    ) {}

    public toString(): string {
        return `Producto: ${this.name}, Cantidad: ${this.quantity}, Precio: Q${this.price.toFixed(2)}`;
    }
}
