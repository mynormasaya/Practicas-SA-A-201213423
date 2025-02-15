import { Product } from "../models/Product";

export class InventoryService {
    private inventory: Product[] = [];

    // Agregar producto al inventario
    addProduct(product: Product): void {
        this.inventory.push(product);
        console.log(`Producto agregado: ${product.toString()}`);
    }

    // Eliminar producto por nombre
    removeProduct(name: string): void {
        const index = this.inventory.findIndex(prod => prod.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            const removed = this.inventory.splice(index, 1);
            console.log(`Producto eliminado: ${removed[0].toString()}`);
        } else {
            console.log(`Producto '${name}' no encontrado.`);
        }
    }

    // Mostrar lista de productos
    listProducts(): void {
        if (this.inventory.length === 0) {
            console.log("El inventario está vacío.");
            return;
        }
        console.log("Inventario:");
        this.inventory.forEach(product => console.log(product.toString()));
    }

    // Buscar producto por nombre
    findProduct(name: string): void {
        const product = this.inventory.find(prod => prod.name.toLowerCase() === name.toLowerCase());
        if (product) {
            console.log(`Producto encontrado: ${product.toString()}`);
        } else {
            console.log(`Producto '${name}' no encontrado.`);
        }
    }

    // Mostrar productos ordenados por precio o cantidad
    listSorted(criteria: "price" | "quantity"): void {
        const sorted = [...this.inventory].sort((a, b) => 
            criteria === "price" ? a.price - b.price : a.quantity - b.quantity
        );
        console.log(`Productos ordenados por ${criteria}:`);
        sorted.forEach(product => console.log(product.toString()));
    }
}
