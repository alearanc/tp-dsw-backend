import { PrismaClient, FotoInmueble } from '@prisma/client';

const prisma = new PrismaClient();

export class PhotosDao {
    static async add(fotoInmuebles: { urlFoto: string; inmuebleId: number }[]) {
        try {
            await prisma.fotoInmueble.createMany({
                data: fotoInmuebles
            });
        } catch (error) {
            console.error('Error en la operación createMany:', error);
            throw new Error('Error al agregar fotos.');
        }
    }

    static async getByInmuebleId(inmuebleId: number): Promise<FotoInmueble[]> {
        try {
            return await prisma.fotoInmueble.findMany({
                where: { inmuebleId }
            });
        } catch (error) {
            console.error('Error al recuperar fotos:', error);
            throw new Error('Error al recuperar fotos.');
        }
    }

    static async deleteById(id_fotoInmueble: number): Promise<void> {
        try {
            await prisma.fotoInmueble.delete({
                where: { id_fotoInmueble }
            });
        } catch (error) {
            console.error('Error al eliminar foto:', error);
            throw new Error('Error al eliminar foto.');
        }
    }
}
