-- Crear la Base de Datos (si no existe)
CREATE DATABASE gimnasio;
\c gimnasio;


-- Tabla de Usuarios con Encriptación
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Hasheada con bcrypt
    telefono VARCHAR(15),
    rol VARCHAR(20) CHECK (rol IN ('estudiante', 'instructor', 'admin')),
    datos_encriptados BYTEA, -- Datos sensibles encriptados (DNI, dirección)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Clases
CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    instructor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    horario TIMESTAMP NOT NULL,
    duracion INTERVAL NOT NULL,
    capacidad INT NOT NULL CHECK (capacidad > 0)
);

-- Tabla de Asistencias
CREATE TABLE asistencias (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    clase_id INT REFERENCES clases(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    registrado_por INT REFERENCES usuarios(id) -- Instructor que aprueba asistencia
);

-- Tabla de Pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    monto DECIMAL(10,2) NOT NULL CHECK (monto > 0),
    metodo_pago VARCHAR(50) CHECK (metodo_pago IN ('tarjeta', 'efectivo', 'transferencia')),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'completado', 'fallido'))
);

-- Tabla de Reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    clase_id INT REFERENCES clases(id) ON DELETE CASCADE,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'confirmada', 'cancelada'))
);

-- Tabla de Inventario
CREATE TABLE inventario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cantidad INT NOT NULL CHECK (cantidad >= 0),
    estado VARCHAR(20) CHECK (estado IN ('disponible', 'en uso', 'mantenimiento')),
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Alquileres
CREATE TABLE alquileres (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    item_id INT REFERENCES inventario(id) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('activo', 'devuelto', 'vencido'))
);

-- Insertar Datos de Prueba
INSERT INTO usuarios (nombre, email, password, telefono, rol, datos_encriptados)
VALUES 
('Admin', 'admin@gimnasio.com', crypt('admin123', gen_salt('bf')), '12345678', 'admin', pgp_sym_encrypt('DNI: 123456789', 'llave_secreta')),
('Instructor 1', 'instructor1@gimnasio.com', crypt('instructor123', gen_salt('bf')), '87654321', 'instructor', pgp_sym_encrypt('DNI: 987654321', 'llave_secreta')),
('Estudiante 1', 'estudiante1@gimnasio.com', crypt('password123', gen_salt('bf')), '11223344', 'estudiante', pgp_sym_encrypt('DNI: 555555555', 'llave_secreta'));

INSERT INTO clases (nombre, descripcion, instructor_id, horario, duracion, capacidad)
VALUES ('Jiu-Jitsu Básico', 'Clase para principiantes', 2, '2025-03-10 18:00:00', '01:30:00', 20);

INSERT INTO asistencias (usuario_id, clase_id, estado)
VALUES (3, 1, 'pendiente');

INSERT INTO pagos (usuario_id, monto, metodo_pago, estado)
VALUES (3, 200, 'tarjeta', 'completado');

INSERT INTO reservas (usuario_id, clase_id, estado)
VALUES (3, 1, 'confirmada');

INSERT INTO inventario (nombre, descripcion, cantidad, estado)
VALUES ('Kimono Azul', 'Kimono para entrenamiento', 10, 'disponible');

INSERT INTO alquileres (usuario_id, item_id, fecha_inicio, estado)
VALUES (3, 1, CURRENT_TIMESTAMP, 'activo');
