import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: any;
}
import jwt, { SignOptions } from 'jsonwebtoken';
import ms from 'ms';

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET!;
    const JWT_RENEWAL_LIMIT = ms(process.env.JWT_RENEWAL_LIMIT as ms.StringValue || '10m') as number; // Convertir a milisegundos
    const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION || '1h';

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const decoded: any = jwt.decode(token);

                // Verificar si está dentro del límite de renovación
                const expirationTime = decoded.exp * 1000;
                const now = Date.now();
                const renewalLimit = expirationTime + JWT_RENEWAL_LIMIT;

                if (now <= renewalLimit) {
                    // Generar un nuevo token
                    const signOptions: SignOptions = { expiresIn: JWT_EXPIRATION as ms.StringValue };
                    const newToken = jwt.sign({ id: decoded.id }, JWT_SECRET, signOptions);
                    res.cookie('token', newToken, { httpOnly: true, secure: true });
                    req.user = decoded;
                    return next();
                } else {
                    return res.status(403).json({ error: 'Token expirado, por favor inicia sesión de nuevo' });
                }
            }
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};
