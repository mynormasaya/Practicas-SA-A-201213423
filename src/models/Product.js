"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    toString() {
        return `Producto: ${this.name}, Cantidad: ${this.quantity}, Precio: Q${this.price.toFixed(2)}`;
    }
}
exports.Product = Product;
