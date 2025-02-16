# Practicas-SA-A-201213423

# Principios SOLID en TypeScript

Este documento explica los principios SOLID con ejemplos en TypeScript para mejorar la calidad del código y su mantenimiento.

## Principios SOLID

### 1. Principio de Responsabilidad Única (SRP - Single Responsibility Principle)
Cada clase debe tener una única responsabilidad y razón para cambiar.

Ejemplo incorrecto (Múltiples responsabilidades en una clase)
```typescript
class Product {
    constructor(public name: string, public price: number, public quantity: number) {}

    saveToDatabase(): void {
        console.log(`Guardando ${this.name} en la base de datos...`);
    }
}
```
Solución: Separar responsabilidades.
```typescript
class Product {
    constructor(public name: string, public price: number, public quantity: number) {}
}

class ProductRepository {
    save(product: Product): void {
        console.log(`Guardando ${product.name} en la base de datos...`);
    }
}
```

---

### 2. Principio Abierto/Cerrado (OCP - Open/Closed Principle)
El código debe estar abierto para extensión, pero cerrado para modificación.

Ejemplo incorrecto (Modificando código existente para nuevos descuentos)
```typescript
class DiscountService {
    getDiscount(type: string): number {
        if (type === "estudiante") return 10;
        if (type === "vip") return 20;
        return 0;
    }
}
```
Solución: Uso de herencia y polimorfismo.
```typescript
abstract class Discount {
    abstract getDiscount(): number;
}

class StudentDiscount extends Discount {
    getDiscount(): number { return 10; }
}

class VIPDiscount extends Discount {
    getDiscount(): number { return 20; }
}
```

---

### 3. Principio de Sustitución de Liskov (LSP - Liskov Substitution Principle)
Las subclases deben poder reemplazar a la superclase sin afectar el programa.

Ejemplo incorrecto (Una subclase cambia el comportamiento esperado)
```typescript
class Rectangle {
    constructor(public width: number, public height: number) {}

    getArea(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    set width(value: number) {
        this.width = this.height = value;
    }
}
```
Solución: Evitar la relación de herencia inapropiada.
```typescript
interface Shape {
    getArea(): number;
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}
    getArea(): number { return this.width * this.height; }
}

class Square implements Shape {
    constructor(public size: number) {}
    getArea(): number { return this.size * this.size; }
}
```

---

### 4. Principio de Segregación de Interfaces (ISP - Interface Segregation Principle)
Una interfaz no debe obligar a implementar métodos innecesarios.

Ejemplo incorrecto (Interfaz con métodos innecesarios)
```typescript
interface Worker {
    work(): void;
    eat(): void;
}

class Robot implements Worker {
    work(): void { console.log("Trabajando..."); }
    eat(): void { throw new Error("Un robot no come"); }
}
```
Solución: Dividir la interfaz en partes más pequeñas.
```typescript
interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}

class Robot implements Workable {
    work(): void { console.log("Trabajando..."); }
}

class Human implements Workable, Eatable {
    work(): void { console.log("Trabajando..."); }
    eat(): void { console.log("Comiendo..."); }
}
```

---

### 5. Principio de Inversión de Dependencias (DIP - Dependency Inversion Principle)
Los módulos de alto nivel no deben depender de módulos de bajo nivel, sino de abstracciones.

Ejemplo incorrecto (Dependencia directa en una clase concreta)
```typescript
class MySQLDatabase {
    save(data: string): void {
        console.log(`Guardando en MySQL: ${data}`);
    }
}

class ProductService {
    private db = new MySQLDatabase();
    
    saveProduct(product: string): void {
        this.db.save(product);
    }
}
```
Solución: Usar abstracciones.
```typescript
interface Database {
    save(data: string): void;
}

class MySQLDatabase implements Database {
    save(data: string): void { console.log(`Guardando en MySQL: ${data}`); }
}

class ProductService {
    constructor(private db: Database) {}

    saveProduct(product: string): void {
        this.db.save(product);
    }
}
```

## Conclusión
Aplicar los principios SOLID en el desarrollo de software ayuda a crear código más limpio, mantenible y flexible, permitiendo la evolución del sistema sin grandes modificaciones.
