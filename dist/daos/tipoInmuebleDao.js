"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoInmuebleDao = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class TipoInmuebleDao {
    static async addTipoInmueble(tipoInmueble) {
        await prisma.TipoInmueble.create({
            data: {
                descripcion: tipoInmueble.descripcion
            }
        });
    }
    static async getAllTipoInmueble() {
        const tipoInmueble = await prisma.TipoInmueble.findMany();
        return tipoInmueble;
    }
    static async getTipoInmuebleByid_tipoinmueble(id_tipoinmueble) {
        const tipoinmueble = await prisma.TipoInmueble.findUnique({
            where: { id_tipoinmueble: id_tipoinmueble },
        });
        return tipoinmueble;
    }
    static async deleteTipoInmuebleByid_tipoinmueble(id_tipoinmueble) {
        await prisma.TipoInmueble.delete({
            where: { id_tipoinmueble: id_tipoinmueble },
        });
    }
    static async updateTipoInmuebleByid_tipoinmueble(id_tipoinmueble, descripcion) {
        const updatetipoinmueble = await prisma.TipoInmueble.update({
            data: { descripcion: descripcion },
            where: { id_tipoinmueble: id_tipoinmueble },
        });
        return updatetipoinmueble;
    }
}
exports.TipoInmuebleDao = TipoInmuebleDao;
