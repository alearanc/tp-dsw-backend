import Reserva from "../models/Reserva";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export class ReservaDao{
    static async getReservasByInmueble(id: number){
        const reservas = await prisma.reserva.findMany({
            where: {
                id_inmueble: id,
                estado: {
                    not: "Cancelado"
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
                estado: {
                    not: "Cancelado"
                }
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
                    estado: 'Reservado',
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

    static async getReservas(userId: number): Promise<Reserva[]> {
        return await prisma.reserva.findMany({
            where: {
                id_huesped: userId,
                estado: {
                    not: "Cancelado"
                },
                fecha_inicio: {
                    gte: new Date(),
                },
            },
            include: {
                inmueble: true,
            }
        });
    }

    static async getReservasCanceladas(userId: number): Promise<Reserva[]> {
        return await prisma.reserva.findMany({
            where: {
                id_huesped: userId,
                estado: "Cancelado",
            },
            include: {
                inmueble: true,
            }
        });
    }

    static async getReservasPasadas(userId: number): Promise<Reserva[]> {
        return await prisma.reserva.findMany({
            where: {
                id_huesped: userId,
                estado: {
                    not: "Cancelado"
                },
                fecha_inicio: {
                    lt: new Date(),
                },
            },
            include: {
                inmueble: true,
            }
        });
    }

    static async cancelarReserva(reserva: Reserva, userId: number): Promise<Reserva> {
        const {inmueble: {id_inmueble}, fecha_inicio} = reserva;
        try {
            return await prisma.reserva.update({
                where: {
                    id_inmueble_id_huesped_fecha_inicio: {
                        id_inmueble: id_inmueble,
                        id_huesped: userId,
                        fecha_inicio: fecha_inicio,
                    },
                        estado: {
                            not: "Cancelado"
                        },
                },
                data: {
                    estado: "Cancelado",
                },
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}