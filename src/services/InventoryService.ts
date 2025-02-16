import { Product } from "../models/Product";

export class InventoryService {
    private inventory: Product[] = [];

    // Agrega un producto al inventario
    addProduct(product: Product): void {
        this.inventory.push(product);
    }

    // Elimina un producto del inventario con validaciones
    removeProduct(name: string, removeAll: boolean = false): void {
        const product = this.inventory.find(prod => prod.name === name);
        if (!product) {
            console.log("Producto no encontrado.");
            return;
        }
        
        if (product.quantity > 1 && !removeAll) {
            product.quantity -= 1;
            console.log(`Se eliminó una unidad de ${product.name}. Cantidad restante: ${product.quantity}`);
        } else {
            this.inventory = this.inventory.filter(prod => prod.name !== name);
            console.log(`Se eliminó completamente el producto: ${product.name}`);
        }
    }

    // Devuelve la lista de productos en el inventario
    listProducts(): Product[] {
        console.log("Inventario actual:");
        this.inventory.forEach(product => console.log(product.toString()));
        return this.inventory;
    }

    // Lista los productos ordenados por precio o cantidad
    listSorted(criteria: "price" | "quantity"): void {
        const sorted = [...this.inventory].sort((a, b) => 
            criteria === "price" ? a.price - b.price : a.quantity - b.quantity
        );
        console.log(`Productos ordenados por ${criteria}:`);
        sorted.forEach(product => console.log(product.toString()));
    }
}