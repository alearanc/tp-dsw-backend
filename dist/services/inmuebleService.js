"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inmuebleDao_1 = require("../daos/inmuebleDao");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class InmuebleService {
    static async getAllInmuebles() {
        try {
            return await inmuebleDao_1.InmuebleDao.getAllInmuebles();
        }
        catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`);
        }
    }
    static async toggleVisibilidad(inmueble, userId) {
        try {
            return await inmuebleDao_1.InmuebleDao.toggleVisibilidad(inmueble, userId);
        }
        catch (error) {
            throw new Error(`Error al cambiar la visibilidad del inmueble.`);
        }
    }
    static async getInmueblesByLocalidad(idLocalidad) {
        try {
            return await inmuebleDao_1.InmuebleDao.getInmueblesByLocalidad(idLocalidad);
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles por localidad: ${error.message}`);
        }
    }
    static async searchInmuebles(criteria) {
        try {
            return await inmuebleDao_1.InmuebleDao.searchInmuebles(criteria);
        }
        catch (error) {
            throw new Error(`Error al buscar inmuebles: ${error.message}`);
        }
    }
    static async getInmueblesByTipoInmueble(idTipoInmueble) {
        try {
            return await inmuebleDao_1.InmuebleDao.getInmueblesByTipoInmueble(idTipoInmueble);
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles por tipo de inmueble: ${error.message}`);
        }
    }
    static async getMyInmuebles(idUsuario) {
        try {
            return await inmuebleDao_1.InmuebleDao.getAllInmueblesById(idUsuario);
        }
        catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`);
        }
    }
    static async getInmueblesWithoutUserReservations(userId) {
        try {
            return await inmuebleDao_1.InmuebleDao.getInmueblesWithoutUserReservations(userId);
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
        }
    }
    static async getInmuebleById(id) {
        try {
            return await inmuebleDao_1.InmuebleDao.getInmuebleById(id);
        }
        catch (error) {
            throw new Error(`Error al obtener el inmueble con ID: ${id}: ${error}`);
        }
    }
    static async addInmueble(inmueble) {
        try {
            const newInmueble = await inmuebleDao_1.InmuebleDao.addInmueble(inmueble);
            return newInmueble;
        }
        catch (error) {
            throw new Error(`Error al agregar el inmueble: ${error}`);
        }
    }
    static async deleteInmueble(id_inmueble, userId) {
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
        }
        catch (error) {
            throw new Error(`Error al eliminar el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
    static async updateInmueble(id_inmueble, inmueble, userId) {
        try {
            const existingInmueble = await prisma.inmueble.findUnique({
                where: { id_inmueble },
            });
            if (!existingInmueble) {
                throw new Error('Inmueble no encontrado');
            }
            console.log(existingInmueble.id_propietario);
            console.log(userId);
            console.log(inmueble);
            if (existingInmueble.id_propietario !== userId) {
                throw new Error('No tienes permiso para actualizar este inmueble');
            }
            return inmuebleDao_1.InmuebleDao.updateInmueble(inmueble);
        }
        catch (error) {
            throw new Error(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
}
exports.default = InmuebleService;
