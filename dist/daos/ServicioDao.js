"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioDao = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ServicioDao {
    static async addServicio(servicio) {
        await prisma.Servicio.create({
            data: {
                descripcion_servicio: servicio.descripcion_servicio
            }
        });
    }
    static async getAllservicio() {
        const servicio = await prisma.servicio.findMany();
        return servicio;
    }
    static async getservicioByid_servicio(id_servicio) {
        const servicio = await prisma.servicio.findUnique({
            where: { id_servicio: id_servicio },
        });
        return servicio;
    }
    static async deleteservicioByid_servicio(id_servicio) {
        await prisma.servicio.delete({
            where: { id_servicio: id_servicio },
        });
    }
    static async updateservicioByid_servicio(id_servicio, descripcion_servicio) {
        const updateservicio = await prisma.servicio.update({
            data: { descripcion_servicio: descripcion_servicio },
            where: { id_servicio: id_servicio },
        });
        return updateservicio;
    }
}
exports.ServicioDao = ServicioDao;
