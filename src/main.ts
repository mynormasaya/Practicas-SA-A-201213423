import * as readlineSync from 'readline-sync';
import { Product } from "./models/Product";
import { InventoryService } from "./services/InventoryService";

const inventory = new InventoryService();

// Función para mostrar el menú de opciones
function showMenu() {
    console.log("\nGestión de Inventario, Software Avanzado Mynor Masaya\n");
    console.log("1. Agregar producto");
    console.log("2. Eliminar producto");
    console.log("3. Listar productos");
    console.log("4. Listar productos por precio");
    console.log("5. Listar productos por cantidad");
    console.log("6. Salir");
}

// Función para obtener una entrada numérica válida
function getValidNumber(prompt: string): number {
    let num: number;
    do {
        const input = readlineSync.question(prompt);
        num = Number(input);
        if (isNaN(num) || num <= 0) {
            console.log("Entrada inválida. Ingrese un número válido.");
        }
    } while (isNaN(num) || num <= 0);
    return num;
}

// Función principal que maneja el menú interactivo
function main() {
    let exit = false;
    while (!exit) {
        showMenu();
        const choice = readlineSync.question("Seleccione una opcion: ");
        
        switch (choice) {
            case "1":
                // Agregar un producto al inventario
                const name = readlineSync.question("Ingrese el nombre del producto: ");
                const quantity = getValidNumber("Ingrese la cantidad: ");
                const price = getValidNumber("Ingrese el precio: ");
                inventory.addProduct(new Product(name, quantity, price));
                console.log("Producto agregado con éxito.");
                break;
            case "2":
                // Eliminar un producto con validaciones
                const nameToRemove = readlineSync.question("Ingrese el nombre del producto a eliminar: ");
                const product = inventory.listProducts().find(prod => prod.name === nameToRemove);
                if (product && product.quantity > 1) {
                    const removeAll = readlineSync.question("El producto tiene más de una unidad. ¿Desea eliminar todas las unidades? (s/n): ").toLowerCase() === "s";
                    inventory.removeProduct(nameToRemove, removeAll);
                } else {
                    inventory.removeProduct(nameToRemove, true);
                }
                break;
            case "3":
                // Listar productos del inventario
                console.log("Lista de productos:");
                inventory.listProducts();
                break;
            case "4":
                // Listar productos ordenados por precio
                console.log("Lista de productos ordenados por precio:");
                inventory.listSorted("price");
                break;
            case "5":
                // Listar productos ordenados por cantidad
                console.log("Lista de productos ordenados por cantidad:");
                inventory.listSorted("quantity");
                break;
            case "6":
                exit = true;
                console.log("Saliendo del programa...");
                break;
            default:
                console.log("Opción no válida. Intente de nuevo.");
        }
    }
}

main();