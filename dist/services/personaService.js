"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const personaDao_1 = require("../daos/personaDao");
const emailService_1 = require("../services/emailService");
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_para_dsw';
class PersonaService {
    static async getAllPersonas() {
        try {
            return await personaDao_1.PersonaDao.getAllPersonas();
        }
        catch (error) {
            throw new Error(`Error al obtener todas las personas: ${error}`);
        }
    }
    static async getPersonaById(id) {
        try {
            return await personaDao_1.PersonaDao.getPersonaByid_usuario(id);
        }
        catch (error) {
            throw new Error(`Error al obtener persona por su ID ${id}: ${error}`);
        }
    }
    static async addPersona(persona) {
        try {
            return await personaDao_1.PersonaDao.addPersona(persona);
        }
        catch (error) {
            if (error.message === 'El email ya está registrado') {
                throw new Error('El email ya está registrado');
            }
            throw new Error(`Error al agregar persona: ${error}`);
        }
    }
    static async deletePersona(id_usuario) {
        try {
            await personaDao_1.PersonaDao.deletePersonaByid_usuario(id_usuario);
        }
        catch (error) {
            throw new Error(`Error al eliminar persona con ID ${id_usuario}: ${error}`);
        }
    }
    static async signin(email, password) {
        const persona = await personaDao_1.PersonaDao.getPersonaByEmail(email);
        if (!persona) {
            throw new Error('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, persona.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }
        const token = jsonwebtoken_1.default.sign({ id_usuario: persona.id_usuario, tipo_usuario: persona.tipo_usuario, isAdmin: persona.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
        return { token, user: { email: persona.email, nombre: persona.nombre, apellido: persona.apellido } };
    }
    static async updatePersona(params) {
        try {
            await personaDao_1.PersonaDao.updatePersona(params);
            return await personaDao_1.PersonaDao.getPersonaByid_usuario(params.id_usuario);
        }
        catch (error) {
            throw new Error(`Error al actualizar persona con ID ${params.id_usuario}: ${error}`);
        }
    }
    static async recoverAccount(email) {
        const persona = await personaDao_1.PersonaDao.getPersonaByEmail(email);
        if (!persona) {
            throw new Error('El email no está registrado');
        }
        const token = jsonwebtoken_1.default.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        await (0, emailService_1.sendRecoveryEmail)(email, token);
    }
    static async resetPassword(token, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            const email = decoded.email;
            await personaDao_1.PersonaDao.updatePassword(email, newPassword);
        }
        catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}
exports.default = PersonaService;
