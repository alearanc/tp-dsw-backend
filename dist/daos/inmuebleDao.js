"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InmuebleDao = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class InmuebleDao {
    static async addInmueble(inmueble) {
        try {
            const nuevoInmueble = await prisma.inmueble.create({
                data: {
                    titulo_inmueble: inmueble.titulo_inmueble,
                    descripcion_inmueble: inmueble.descripcion_inmueble,
                    precio_noche: inmueble.precio_noche,
                    direccion_inmueble: inmueble.direccion_inmueble,
                    capacidad: inmueble.capacidad,
                    id_tipoinmueble: 1,
                    cod_postal: 2000,
                    id_propietario: inmueble.propietario,
                },
            });
            return nuevoInmueble; // Devolvemos con ID
        }
        catch (error) {
            throw new Error(`Error al agregar inmueble: ${error}`);
        }
    }
    static async searchInmuebles(criteria) {
        try {
            return await prisma.$queryRaw `
            SELECT i.*
            FROM Inmueble i
            LEFT JOIN TipoInmueble ti ON i.id_tipoinmueble = ti.id_tipoinmueble
            LEFT JOIN Localidad l ON i.cod_postal = l.cod_postal
            WHERE MATCH(i.titulo_inmueble, i.descripcion_inmueble) AGAINST (${criteria} IN NATURAL LANGUAGE MODE)
            OR ti.descripcion LIKE ${'%' + criteria + '%'}
            OR l.nombre LIKE ${'%' + criteria + '%'}
        `;
        }
        catch (error) {
            throw new Error(`Error al buscar inmuebles: ${error}`);
        }
    }
    static async getInmueblesByLocalidad(idLocalidad) {
        try {
            return await prisma.inmueble.findMany({
                where: {
                    cod_postal: idLocalidad,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles por localidad: ${error}`);
        }
    }
    static async getInmueblesByTipoInmueble(idTipoInmueble) {
        try {
            return await prisma.inmueble.findMany({
                where: {
                    id_tipoinmueble: idTipoInmueble,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles por tipo de inmueble: ${error}`);
        }
    }
    static async toggleVisibilidad(inmueble, UserId) {
        try {
            return await prisma.inmueble.update({
                where: { id_inmueble: inmueble.id_inmueble,
                    id_propietario: UserId },
                data: {
                    habilitado: !inmueble.habilitado,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al cambiar la visibilidad del inmueble.`);
        }
    }
    static async getAllInmuebles() {
        try {
            return (await prisma.inmueble.findMany());
        }
        catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`);
        }
    }
    static async getAllInmueblesById(idUsuario) {
        try {
            return await prisma.inmueble.findMany({
                where: {
                    id_propietario: idUsuario,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener todos mis inmuebles: ${error}`);
        }
    }
    static async getInmueblesWithoutUserReservations(userId) {
        try {
            // Obtener IDs de inmuebles con reservas futuras en estado "RESERVADO" para el usuario actual
            const inmueblesConReservas = await prisma.reserva.findMany({
                where: {
                    id_huesped: userId,
                    estado: 'RESERVADO',
                    fecha_inicio: {
                        gte: new Date(), // Solo reservas futuras
                    },
                },
                select: {
                    id_inmueble: true,
                },
            });
            const idsInmueblesConReservas = inmueblesConReservas.map((reserva) => reserva.id_inmueble);
            // Obtener inmuebles que no están en la lista de IDs con reservas
            return await prisma.inmueble.findMany({
                where: {
                    id_inmueble: {
                        notIn: idsInmueblesConReservas,
                    },
                    habilitado: true,
                },
                include: {
                    localidad: true,
                    tipo_inmueble: true,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
        }
    }
    static async getInmuebleById(id_inmueble) {
        try {
            return await prisma.inmueble.findUnique({
                where: { id_inmueble },
                include: {
                    localidad: true,
                    tipo_inmueble: true,
                },
            });
        }
        catch (error) {
            throw new Error(`Error al obtener el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
    static async deleteInmueble(id_inmueble) {
        try {
            await prisma.inmueble.delete({
                where: { id_inmueble }
            });
        }
        catch (error) {
            throw new Error(`Error al eliminar el inmueble con el ID ${id_inmueble}: ${error}`);
        }
    }
    static async updateInmueble(params) {
        const { id_inmueble, titulo_inmueble, descripcion_inmueble, precio_noche, direccion_inmueble, capacidad, tipo_inmueble, localidad } = params;
        try {
            return await prisma.inmueble.update({
                where: { id_inmueble },
                data: {
                    titulo_inmueble,
                    descripcion_inmueble,
                    precio_noche,
                    direccion_inmueble,
                    capacidad,
                    id_tipoinmueble: tipo_inmueble.id_tipoinmueble,
                    cod_postal: localidad.cod_postal
                },
            });
        }
        catch (error) {
            throw new Error(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
        }
    }
}
exports.InmuebleDao = InmuebleDao;
