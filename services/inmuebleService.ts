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

    static async toggleVisibilidad(inmueble: Inmueble, userId: number): Promise<Inmueble> {
        try {
            return await InmuebleDao.toggleVisibilidad(inmueble, userId);
        } catch (error) {
            throw new Error(`Error al cambiar la visibilidad del inmueble.`);
        }
    }

    static async getInmueblesByLocalidad(idLocalidad: number): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getInmueblesByLocalidad(idLocalidad);
        } catch (error: any) {
            throw new Error(`Error al obtener inmuebles por localidad: ${error.message}`);
        }
    }

    static async getInmueblesByTipoInmueble(idTipoInmueble: number): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getInmueblesByTipoInmueble(idTipoInmueble);
        } catch (error: any) {
            throw new Error(`Error al obtener inmuebles por tipo de inmueble: ${error.message}`);
        }
    }

    static async getMyInmuebles(idUsuario: number): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getAllInmueblesById(idUsuario)
        } catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`)
        }
    }

    static async getInmueblesWithoutUserReservations(userId: number): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getInmueblesWithoutUserReservations(userId);
        } catch (error) {
            throw new Error(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
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
            const newInmueble = await InmuebleDao.addInmueble(inmueble)
            return newInmueble
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
