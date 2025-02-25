import Reserva from "../models/Reserva";
import { sendTurnoCancelado } from "../services/emailService";

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
            },
            include: {
                huesped: true
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

    static async cancelarReserva(reserva: Reserva | any): Promise<Reserva> {
        const {fecha_inicio} = reserva;
        let id_inmueble = reserva.inmueble ? reserva.inmueble.id_inmueble : reserva.id_inmueble;
        try {
            let reservaCancelada = await prisma.reserva.update({
                where: {
                    id_inmueble_id_huesped_fecha_inicio: {
                        id_huesped: reserva.huesped.id_usuario,
                        id_inmueble: id_inmueble,
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
        let inmueble = await prisma.inmueble.findUnique({
            where: {
                id_inmueble: id_inmueble
            }
        })
        reserva.inmueble = inmueble;
        sendTurnoCancelado(reserva, reserva.huesped.email);
        return reservaCancelada;
        } catch (error: any) {
            throw new Error(error);
        }
    }
    
    static async valorarReserva(data: {
        id_inmueble: number;
        id_huesped: number;
        fecha_inicio: Date;
        puntuacion: number;
    }): Promise<Reserva> {
        const { id_inmueble, id_huesped, fecha_inicio, puntuacion } = data;

        try {
            const updatedReserva = await prisma.reserva.update({
                where: {
                    id_inmueble_id_huesped_fecha_inicio: {
                        id_inmueble,
                        id_huesped,
                        fecha_inicio,
                    },
                },
                data: {
                    puntuacion,
                    fecha_valoracion: new Date(),
                },
                include: {
                    inmueble: true,
                    huesped: true,
                },
            });
            return updatedReserva;
        } catch (error: any) {
            throw new Error(`Error al actualizar la valoración: ${error}`);
        }
    }
}