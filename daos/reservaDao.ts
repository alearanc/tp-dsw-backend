import Reserva from "../models/Reserva";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export class ReservaDao{
    static async getReservasByInmueble(id: number){
        const reservas = await prisma.reserva.findMany({
            where: {
                id_inmueble: id,
                estado: {
                    not: "cancelado"
                }
            }
        });
        return reservas;
    }

    static async checkOverlap(id_inmueble: number, fecha_inicio: Date, fecha_fin: Date): Promise<boolean> {
        const overlappingReservas = await prisma.reserva.findMany({
            where: {
                id_inmueble: id_inmueble,
                OR: [
                    {
                        fecha_inicio: {
                            lte: fecha_fin,
                        },
                        fecha_fin: {
                            gte: fecha_inicio,
                        },
                    },
                ],
            },
        });

        return overlappingReservas.length > 0;
    }

    static async hasFutureReservation(id_inmueble: number, userId: number): Promise<boolean> {
        try {
            const futureReservation = await prisma.reserva.findFirst({
                where: {
                    id_inmueble: id_inmueble,
                    id_huesped: userId,
                    estado: 'RESERVADO',
                    fecha_inicio: {
                        gte: new Date(),
                    },
                },
            });

            return futureReservation !== null;
        } catch (error) {
            throw new Error(`Error al verificar reservas futuras: ${error}`);
        }
    }

    static async createReserva(reserva: any): Promise<Reserva> {
        try {
            return await prisma.reserva.create({
                data: reserva,
            });
        } catch (error) {
            throw new Error(`Error al crear la reserva: ${error}`);
        }
    }
}