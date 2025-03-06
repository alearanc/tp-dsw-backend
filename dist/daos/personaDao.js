"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaDao = void 0;
const { PrismaClient } = require('@prisma/client');
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new PrismaClient();
class PersonaDao {
    static async addPersona(persona) {
        try {
            // Verificar si el email ya existe
            const existingPersona = await prisma.persona.findUnique({
                where: { email: persona.email },
            });
            if (existingPersona) {
                throw new Error('El email ya está registrado');
            }
            const hashedPassword = await bcrypt_1.default.hash(persona.password, 10);
            return await prisma.persona.create({
                data: {
                    nombre: persona.nombre,
                    apellido: persona.apellido,
                    email: persona.email,
                    password: hashedPassword,
                    tipo_usuario: persona.tipo_usuario,
                    telefono: persona.telefono,
                    domicilio: persona.domicilio
                },
            });
        }
        catch (error) {
            throw new Error(`Error al agregar persona: ${error}`);
        }
    }
    static async getAllPersonas() {
        try {
            return (await prisma.persona.findMany());
        }
        catch (error) {
            throw new Error(`Error al obtener todas las personas: ${error}`);
        }
    }
    static async getPersonaByid_usuario(id_usuario) {
        try {
            return await prisma.persona.findUnique({
                where: { id_usuario },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener la persona con ID ${id_usuario}: ${error}`);
        }
    }
    static async deletePersonaByid_usuario(id_usuario) {
        try {
            await prisma.persona.delete({
                where: { id_usuario },
            });
        }
        catch (error) {
            throw new Error(`Error al eliminar la persona con el ID ${id_usuario}: ${error}`);
        }
    }
    static async getPersonaByEmail(email) {
        try {
            return await prisma.persona.findUnique({
                where: { email },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener la persona con email ${email}: ${error}`);
        }
    }
    static async updatePassword(email, newPassword) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            await prisma.persona.update({
                where: { email },
                data: { password: hashedPassword },
            });
        }
        catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error}`);
        }
    }
    static async updatePersona(params) {
        const { id_usuario, nombre, apellido, email, password, tipo_usuario, telefono, domicilio, } = params;
        try {
            const personaExistente = await prisma.persona.findUnique({
                where: { id_usuario },
            });
            if (!personaExistente) {
                throw new Error(`Persona con ID ${id_usuario} no encontrada.`);
            }
            const datosActualizados = {};
            if (nombre !== undefined)
                datosActualizados.nombre = nombre;
            if (apellido !== undefined)
                datosActualizados.apellido = apellido;
            if (email !== undefined)
                datosActualizados.email = email;
            if (password !== undefined)
                datosActualizados.password = password;
            if (tipo_usuario !== undefined)
                datosActualizados.tipo_usuario = tipo_usuario;
            if (telefono !== undefined)
                datosActualizados.telefono = telefono;
            if (domicilio !== undefined)
                datosActualizados.domicilio = domicilio;
            return await prisma.persona.update({
                where: { id_usuario },
                data: datosActualizados,
            });
        }
        catch (error) {
            throw new Error(`Error al actualizar la persona con ID ${id_usuario}: ${error}`);
        }
    }
}
exports.PersonaDao = PersonaDao;
