import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../database.js';
import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import { encryptAES, decryptAES } from '../utils/cryptoUtil.js';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION || '1h';

export const register = async (req: Request, res: Response) => {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        name = encryptAES(name);
        email = encryptAES(email);
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'El correo ya está registrado' });
        } else {
            console.error('Error en registro:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

// **Inicio de Sesión con Desencriptación AES**
export const login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    try {
        const encryptedEmail = encryptAES(email);
        const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [encryptedEmail]);

        if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const decryptedName = decryptAES(rows[0].name);
        const token = jwt.sign({ id: rows[0].id, name: decryptedName }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', { httpOnly: true, secure: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logout exitoso' });
};

export const refreshToken = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        const newToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION as ms.StringValue });
        res.cookie('token', newToken, { httpOnly: true, secure: true });
        res.json({ message: 'Token renovado exitosamente' });
    });
};