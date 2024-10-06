import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_para_dsw';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }

    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id_usuario;
        next();
    } catch (error) {
        return res.status(401).send('Token inválido');
    }
};