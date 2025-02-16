"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
class InventoryService {
    constructor() {
        this.inventory = [];
    }
    // Agrega un producto al inventario
    addProduct(product) {
        this.inventory.push(product);
    }
    // Elimina un producto del inventario con validaciones
    removeProduct(name, removeAll = false) {
        const product = this.inventory.find(prod => prod.name === name);
        if (!product) {
            console.log("Producto no encontrado.");
            return;
        }
        if (product.quantity > 1 && !removeAll) {
            product.quantity -= 1;
            console.log(`Se eliminó una unidad de ${product.name}. Cantidad restante: ${product.quantity}`);
        }
        else {
            this.inventory = this.inventory.filter(prod => prod.name !== name);
            console.log(`Se eliminó completamente el producto: ${product.name}`);
        }
    }
    // Devuelve la lista de productos en el inventario
    listProducts() {
        console.log("Inventario actual:");
        this.inventory.forEach(product => console.log(product.toString()));
        return this.inventory;
    }
    // Lista los productos ordenados por precio o cantidad
    listSorted(criteria) {
        const sorted = [...this.inventory].sort((a, b) => criteria === "price" ? a.price - b.price : a.quantity - b.quantity);
        console.log(`Productos ordenados por ${criteria}:`);
        sorted.forEach(product => console.log(product.toString()));
    }
}
exports.InventoryService = InventoryService;
