"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./models/Product");
const InventoryService_1 = require("./services/InventoryService");
// Instancia del servicio de inventario
const inventory = new InventoryService_1.InventoryService();
// Agregar productos
inventory.addProduct(new Product_1.Product("Laptop", 5, 7500));
inventory.addProduct(new Product_1.Product("Mouse", 20, 150));
inventory.addProduct(new Product_1.Product("Teclado", 10, 350));
// Listar productos
inventory.listProducts();
// Buscar un producto
inventory.findProduct("Mouse");
// Eliminar un producto
inventory.removeProduct("Mouse");
// Intentar eliminar un producto que no existe
inventory.removeProduct("Monitor");
// Mostrar productos ordenados por precio
inventory.listSorted("price");
// Mostrar productos ordenados por cantidad
inventory.listSorted("quantity");
