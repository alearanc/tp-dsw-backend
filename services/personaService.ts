import { PersonaDao } from '../daos/personaDao'
import Persona from '../models/Persona'
import { UpdatePersonaParams } from '../interfaces/UpdatePersonaParams.interface'

export default class PersonaService {
    //  Método para obtener todas las personas
    static async getAllPersonas(): Promise<Persona[]> {
        try {
            return await PersonaDao.getAllPersonas()
        } catch (error) {
            throw new Error(`Error al obtener todas las personas: ${error.message}`);
        }
    }
    //  Método para obtener una persona por su ID de usuario
    static async getPersonaById(id: number): Promise<Persona> {
        try {
            return await PersonaDao.getPersonaByid_usuario(id)
        } catch (error) {
            throw new Error(`Error al obtener persona por su ID ${id}: ${error.message}`)
        }
    }
    //  Método para agregar una persona nueva
    static async addPersona(persona: Persona): Promise<Persona> {
        try {
            await PersonaDao.addPersona(persona)
            return persona
        } catch (error) {
            throw new Error(`Error al agregar persona: ${error.message}`);
        }
    }
    //  Método para eliminar una persona por su ID de usuario
    static async deletePersona(id_usuario: number): Promise<void> {
        try {
            await PersonaDao.deletePersonaByid_usuario(id_usuario)
        } catch (error) {
            throw new Error(`Error al eliminar persona con ID ${id_usuario}: ${error.message}`)
        }
    }
    //  Método para actualizar una persona
    static async updatePersona(params: UpdatePersonaParams): Promise<Persona> {
        try {
            await PersonaDao.updatePersona(params)
            return await PersonaDao.getPersonaByid_usuario(params.id_usuario)
        } catch (error) {
            throw new Error(`Error al actualizar persona con ID ${params.id_usuario}: ${error.message}`);
        }
    }
}
