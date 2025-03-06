"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosDao = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PhotosDao {
    static async add(fotoInmuebles) {
        try {
            await prisma.fotoInmueble.createMany({
                data: fotoInmuebles
            });
        }
        catch (error) {
            console.error('Error en la operación createMany:', error);
            throw new Error('Error al agregar fotos.');
        }
    }
    static async getByInmuebleId(inmuebleId) {
        try {
            return await prisma.fotoInmueble.findMany({
                where: { inmuebleId }
            });
        }
        catch (error) {
            console.error('Error al recuperar fotos:', error);
            throw new Error('Error al recuperar fotos.');
        }
    }
    static async deleteById(id_fotoInmueble) {
        try {
            await prisma.fotoInmueble.delete({
                where: { id_fotoInmueble }
            });
        }
        catch (error) {
            console.error('Error al eliminar foto:', error);
            throw new Error('Error al eliminar foto.');
        }
    }
}
exports.PhotosDao = PhotosDao;
