"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadDao = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class LocalidadDao {
    static async addLocalidad(localidad) {
        await prisma.Localidad.create({
            data: {
                cod_postal: localidad.cod_postal,
                nombre: localidad.nombre,
            }
        });
    }
    static async getAllLocalidades() {
        const localidades = await prisma.Localidad.findMany();
        return localidades;
    }
    static async getLocalidadBycod_postal(cod_postal) {
        const localidad = await prisma.localidad.findUnique({
            where: { cod_postal: cod_postal },
        });
        return localidad;
    }
    static async deleteLocalidadBycod_postal(cod_postal) {
        await prisma.localidad.delete({
            where: { cod_postal: cod_postal },
        });
    }
    static async updateLocalidad(cod_postal, nombre) {
        const updatedLocalidad = await prisma.localidad.update({
            where: { cod_postal: cod_postal },
            data: { nombre: nombre },
        });
        return updatedLocalidad;
    }
}
exports.LocalidadDao = LocalidadDao;
