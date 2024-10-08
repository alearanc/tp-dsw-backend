const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export class ReservaDao{
    static async getReservasByInmueble(id: number){
        const reservas = await prisma.reserva.findMany({
            where: { id_inmueble: id }
        });
        return reservas;
    }
}