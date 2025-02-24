import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const AES_SECRET_KEY = process.env.AES_SECRET_KEY!;
const AES_IV = process.env.AES_IV!;

// Verificar que las claves tienen el tamaño correcto
if (AES_SECRET_KEY.length !== 32) {
    throw new Error('AES_SECRET_KEY debe tener exactamente 32 caracteres');
}

if (AES_IV.length !== 16) {
    throw new Error('AES_IV debe tener exactamente 16 caracteres');
}

export const encryptAES = (text: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AES_SECRET_KEY, 'utf-8'), Buffer.from(AES_IV, 'utf-8'));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decryptAES = (encryptedText: string): string => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(AES_SECRET_KEY, 'utf-8'), Buffer.from(AES_IV, 'utf-8'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
