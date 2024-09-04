import { PersonaDao } from '../daos/personaDao'
import Persona from '../models/Persona'

export default class PersonaService {
    static async getAllPersonas(): Promise<Persona[]> {
        try {
            return await PersonaDao.getAllPersonas();
        } catch (error) {
            throw new Error(`Error al obtener todas las personas: ${error}`);
        }
    }
    static async getPersonaById(id: number): Promise<Persona> {
        try {
            return await PersonaDao.getPersonaByid_usuario(id);
        } catch (error) {
            throw new Error(`Error al obtener persona por su ID ${id}: ${error}`)
        }
    }
    static async addPersona(persona: Persona): Promise<Persona> {
        try {
            await PersonaDao.addPersona(persona);
            return persona;
        } catch (error) {
            throw new Error(`Error al agregar persona: ${error}`);
        }
    }
    static async deletePersona(id_usuario: number): Promise<void> {
        try {
            await PersonaDao.deletePersonaByid_usuario(id_usuario);
        } catch (error) {
            throw new Error(`Error al eliminar persona con ID ${id_usuario}: ${error}`);
        }
    }
    static async updatePersona(params: Persona): Promise<Persona> {
        try {
            await PersonaDao.updatePersona(params)
            return await PersonaDao.getPersonaByid_usuario(params.id_usuario);
        } catch (error) {
            throw new Error(`Error al actualizar persona con ID ${params.id_usuario}: ${error}`);
        }
    }
}
