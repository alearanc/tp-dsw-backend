import { PrismaClient, InmuebleServicio } from '@prisma/client';

const prisma = new PrismaClient();

export class InmuebleServicioDao {

    static async getByInmuebleId(id_inmueble: number): Promise<InmuebleServicio[]> {
        try {
            return await prisma.inmuebleServicio.findMany({
                where: { id_inmueble },
                include: {
                    servicio: true, // Esto incluye los detalles del servicio asociado
                },
            });
        } catch (error) {
            console.error('Error al recuperar servicios del inmueble:', error);
            throw new Error('Error al recuperar servicios del inmueble.');
        }
    }    
    
    static async add(inmuebleServicios: { id_inmueble: number; id_servicio: number }[]) {
        try {
            await prisma.inmuebleServicio.createMany({
                data: inmuebleServicios,
            });
        } catch (error) {
            console.error('Error en la operación createMany:', error);
            throw new Error('Error al agregar relaciones entre inmuebles y servicios.');
        }
    }

    static async deleteByInmuebleAndServicio(id_inmueble: number, id_servicio: number): Promise<void> {
        try {
            await prisma.inmuebleServicio.delete({
                where: {
                    id_inmueble_id_servicio: {
                        id_inmueble,
                        id_servicio,
                    },
                },
            });
        } catch (error) {
            console.error('Error al eliminar la relación entre inmueble y servicio:', error);
            throw new Error('Error al eliminar la relación entre inmueble y servicio.');
        }
    }
}
