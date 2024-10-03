const { PrismaClient } = require('@prisma/client');
import bcrypt from 'bcrypt';
import Persona from '../models/Persona';

const prisma = new PrismaClient();

export class PersonaDao {
    static async addPersona(persona: Persona) {
        try {
            // Verificar si el email ya existe
            const existingPersona = await prisma.persona.findUnique({
                where: { email: persona.email },
            });

            if (existingPersona) {
                throw new Error('El email ya está registrado');
            }

            const hashedPassword = await bcrypt.hash(persona.password, 10);
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
        } catch (error) {
            throw new Error(`Error al agregar persona: ${error}`);
        }
    }

    static async getAllPersonas(): Promise<Persona[]> {
        try {
            return (await prisma.persona.findMany()) as Persona[];
        } catch (error) {
            throw new Error(`Error al obtener todas las personas: ${error}`);
        }
    }

    static async getPersonaByid_usuario(id_usuario: number): Promise<Persona> {
        try {
            return await prisma.persona.findUnique({
                where: { id_usuario },
            })
        } catch (error) {
            throw new Error(
                `Error al obtener la persona con ID ${id_usuario}: ${error}`
            );
        }
    }

    static async deletePersonaByid_usuario(id_usuario: number): Promise<void> {
        try {
            await prisma.persona.delete({
                where: { id_usuario },
            })
        } catch (error) {
            throw new Error(
                `Error al eliminar la persona con el ID ${id_usuario}: ${error}`
            );
        }
    }

    static async getPersonaByEmail(email: string): Promise<Persona> {
        try {
            return await prisma.persona.findUnique({
                where: { email },
            });
        } catch (error) {
            throw new Error(`Error al obtener la persona con email ${email}: ${error}`);
        }
    }

    static async updatePassword(email: string, newPassword: string): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.persona.update({
                where: { email },
                data: { password: hashedPassword },
            });
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error}`);
        }
    }

    static async updatePersona(
        params: Persona
    ): Promise<Persona> {
        const {
            id_usuario,
            nombre,
            apellido,
            email,
            password,
            tipo_usuario,
            telefono,
            domicilio,
        } = params

        try {
            const personaExistente = await prisma.persona.findUnique({
                where: { id_usuario },
            });
    
            if (!personaExistente) {
                throw new Error(`Persona con ID ${id_usuario} no encontrada.`);
            }

            const datosActualizados: any = {};
            if (nombre !== undefined) datosActualizados.nombre = nombre;
            if (apellido !== undefined) datosActualizados.apellido = apellido;
            if (email !== undefined) datosActualizados.email = email;
            if (password !== undefined) datosActualizados.password = password;
            if (tipo_usuario !== undefined) datosActualizados.tipo_usuario = tipo_usuario;
            if (telefono !== undefined) datosActualizados.telefono = telefono;
            if (domicilio !== undefined) datosActualizados.domicilio = domicilio;

            return await prisma.persona.update({
                where: { id_usuario },
                data: datosActualizados,
            })
        } catch (error) {
            throw new Error(
                `Error al actualizar la persona con ID ${id_usuario}: ${error}`
            );
        }
    }
}
