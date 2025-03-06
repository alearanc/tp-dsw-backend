"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaDao = void 0;
const emailService_1 = require("../services/emailService");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ReservaDao {
    static async getReservasByInmueble(id) {
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
    static async checkOverlap(id_inmueble, fecha_inicio, fecha_fin) {
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
    static async hasFutureReservation(id_inmueble, userId) {
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
        }
        catch (error) {
            throw new Error(`Error al verificar reservas futuras: ${error}`);
        }
    }
    static async createReserva(reserva) {
        try {
            return await prisma.reserva.create({
                data: reserva,
            });
        }
        catch (error) {
            throw new Error(`Error al crear la reserva: ${error}`);
        }
    }
    static async getReservas(userId) {
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
    static async getReservasCanceladas(userId) {
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
    static async getReservasPasadas(userId) {
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
    static async cancelarReserva(reserva) {
        const { fecha_inicio } = reserva;
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
            });
            reserva.inmueble = inmueble;
            (0, emailService_1.sendTurnoCancelado)(reserva, reserva.huesped.email);
            return reservaCancelada;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async valorarReserva(data) {
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
        }
        catch (error) {
            throw new Error(`Error al actualizar la valoración: ${error}`);
        }
    }
}
exports.ReservaDao = ReservaDao;
