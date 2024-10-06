import { InmuebleDao } from '../daos/inmuebleDao';
import Inmueble from '../models/Inmueble';
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

export default class InmuebleService {
    static async getAllInmuebles(): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getAllInmuebles()
        } catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`)
        }
    }
    static async getInmuebleById(id: number): Promise<Inmueble> {
        try {
            return await InmuebleDao.getInmuebleById(id)
        } catch (error) {
            throw new Error(`Error al obtener el inmueble con ID: ${id}: ${error}`)
        }
    }
    static async addInmueble(inmueble: Inmueble): Promise<Inmueble> {
        try {
            await InmuebleDao.addInmueble(inmueble)
            return inmueble
        } catch (error) {
            throw new Error(`Error al agregar el inmueble: ${error}`)
        }
    }
    static async deleteInmueble(id_inmueble: number, userId: number): Promise<Inmueble> {
        try {
            const existingInmueble = await prisma.inmueble.findUnique({
                where: { id_inmueble },
            });

            
            if (!existingInmueble) {
                throw new Error('Inmueble no encontrado');
            }
            
            if (existingInmueble.id_propietario !== userId) {
                throw new Error('No tienes permiso para eliminar este inmueble');
            }
            
            return await prisma.inmueble.delete({
                where: { id_inmueble },
            });
        } catch (error) {
            throw new Error(`Error al eliminar el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
    static async updateInmueble(id_inmueble: number, inmueble: Inmueble, userId: number): Promise<Inmueble> {
        try {
            const existingInmueble = await prisma.inmueble.findUnique({
                where: { id_inmueble },
            });

            if (!existingInmueble) {
                throw new Error('Inmueble no encontrado');
            }

            console.log(existingInmueble.id_propietario)
            console.log(userId)
            console.log(inmueble)

            if (existingInmueble.id_propietario !== userId) {
                throw new Error('No tienes permiso para actualizar este inmueble');
            }

            return InmuebleDao.updateInmueble(inmueble);
        } catch (error) {
            throw new Error(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
}
