import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PersonaDao } from '../daos/personaDao';
import Persona from '../models/Persona';
import { sendRecoveryEmail } from '../services/emailService';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_para_dsw';

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
            return await PersonaDao.addPersona(persona);
        } catch (error: any) {
            if (error.message === 'El email ya está registrado') {
                throw new Error('El email ya está registrado');
            }
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
    static async signin(email: string, password: string) {
        const persona = await PersonaDao.getPersonaByEmail(email);
        if (!persona) {
            return null;
        }
    
        const isPasswordValid = await bcrypt.compare(password, persona.password);
        if (!isPasswordValid) {
            return null;
        }
    
        const token = jwt.sign({ id_usuario: persona.id_usuario, email: persona.email }, SECRET_KEY, { expiresIn: '1h' });
        return { token, user: { id_usuario: persona.id_usuario, email: persona.email, nombre: persona.nombre, apellido: persona.apellido } };
    }
    static async updatePersona(params: Persona): Promise<Persona> {
        try {
            await PersonaDao.updatePersona(params)
            return await PersonaDao.getPersonaByid_usuario(params.id_usuario);
        } catch (error) {
            throw new Error(`Error al actualizar persona con ID ${params.id_usuario}: ${error}`);
        }
    }

    static async recoverAccount(email: string) {
        const persona = await PersonaDao.getPersonaByEmail(email);
        if (!persona) {
            throw new Error('El email no está registrado');
        }

        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        await sendRecoveryEmail(email, token);
    }

    static async resetPassword(token: string, newPassword: string) {
        try {
            const decoded: any = jwt.verify(token, SECRET_KEY);
            const email = decoded.email;
            await PersonaDao.updatePassword(email, newPassword);
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}
