const { PrismaClient } = require('@prisma/client')
import Localidad from '../models/Localidad'
import Persona from '../models/Persona'
import { TipoUsuario } from '../models/TipoUsuario.enum'
const prisma = new PrismaClient()

export class PersonaDao {
    static async addPersona(persona: Persona) {
        try {
            const newPersona = await prisma.persona.create({
                data: {
                    id_usuario: persona.id_usuario,
                    nombre: persona.nombre,
                    apellido: persona.apellido,
                    email: persona.email,
                    password: persona.password,
                    tipo_usuario: persona.tipo_usuario,
                    telefono: persona.telefono,
                    domicilio: persona.domicilio,
                    localidad: persona.localidad,
                },
            })
            return newPersona
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }

    static async getAllPersonas(): Promise<Persona[]> {
        try {
            const personas = await prisma.persona.findMany()
            return <Persona[]>personas
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }

    static async getPersonaByid_usuario(id_usuario: number): Promise<Persona[]> {
        try {
            const persona = await prisma.persona.findUnique({
                where: { id_usuario: id_usuario },
            })
            return persona
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }

    static async deletePersonaByid_usuario(id_usuario: number): Promise<void> {
        try {
            await prisma.persona.delete({
                where: { id_usuario: id_usuario },
            })
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
    }

    static async updatePersona(
        id_usuario: number,
        nombre: string,
        apellido: string,
        email: string,
        password: string,
        tipo_usuario: TipoUsuario,
        telefono: string,
        domicilio: string,
        localidad: Localidad
    ): Promise<Persona | null> {
        const updatedPersona = await prisma.persona.update({
            where: { id_usuario: id_usuario },
            data: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                tipo_usuario: tipo_usuario,
                telefono: telefono,
                domicilio: domicilio,
                localidad: localidad,
            },
        })
        return updatedPersona
    }
}
