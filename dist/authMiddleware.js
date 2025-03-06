"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_para_dsw';
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.userId = decoded.id_usuario;
        req.isAdmin = decoded.isAdmin; // Añadir isAdmin al request
        next();
    }
    catch (error) {
        return res.status(401).send('Token inválido');
    }
};
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => {
    if (req.isAdmin) {
        next();
    }
    else {
        return res.status(403).send('No tienes permisos de administrador');
    }
};
exports.isAdmin = isAdmin;
