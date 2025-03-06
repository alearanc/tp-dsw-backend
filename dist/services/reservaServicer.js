"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservaDao_1 = require("../daos/reservaDao");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ReservasService {
    static async getReservasByInmueble(id) {
        return await reservaDao_1.ReservaDao.getReservasByInmueble(id);
    }
    static async reservar(reserva, userId) {
        const { inmueble, fecha_inicio, fecha_fin } = reserva;
        // Crear un nuevo objeto reservaInsertar y asignar userId a id_huesped
        const reservaInsertar = {
            fecha_inicio: reserva.fecha_inicio,
            fecha_fin: reserva.fecha_fin,
            estado: reserva.estado,
            observaciones: reserva.observaciones,
            id_inmueble: reserva.inmueble.id_inmueble,
            id_huesped: userId,
        };
        try {
            // Verificar si hay reservas superpuestas
            const isOverlapping = await reservaDao_1.ReservaDao.checkOverlap(inmueble.id_inmueble, fecha_inicio, fecha_fin);
            if (isOverlapping) {
                throw new Error('La reserva se superpone con otra existente');
            }
            // Crear la nueva reserva
            return await reservaDao_1.ReservaDao.createReserva(reservaInsertar);
        }
        catch (error) {
            throw new Error(`Error al realizar la reserva: ${error.message}`);
        }
    }
    static async hasFutureReservation(id_inmueble, userId) {
        try {
            return await reservaDao_1.ReservaDao.hasFutureReservation(id_inmueble, userId);
        }
        catch (error) {
            throw new Error(`Error al verificar reservas futuras: ${error}`);
        }
    }
    static async getReservas(userId) {
        return await reservaDao_1.ReservaDao.getReservas(userId);
    }
    static async getReservasCanceladas(userId) {
        return await reservaDao_1.ReservaDao.getReservasCanceladas(userId);
    }
    static async getReservasPasadas(userId) {
        return await reservaDao_1.ReservaDao.getReservasPasadas(userId);
    }
    static async cancelarReserva(reserva) {
        try {
            return await reservaDao_1.ReservaDao.cancelarReserva(reserva);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async valorarReserva(data) {
        const { id_inmueble, id_huesped, fecha_inicio, puntuacion } = data;
        if (!Number.isInteger(puntuacion) || puntuacion < 1 || puntuacion > 5) {
            throw new Error("La puntuación debe ser un número entero entre 1 y 5");
        }
        try {
            const updatedReserva = await reservaDao_1.ReservaDao.valorarReserva({
                id_inmueble,
                id_huesped,
                fecha_inicio,
                puntuacion,
            });
            await this.actualizarPromedioInmueble(id_inmueble);
            return updatedReserva;
        }
        catch (error) {
            throw new Error(`Error al valorar la reserva: ${error.message}`);
        }
    }
    static async actualizarPromedioInmueble(id_inmueble) {
        const reservas = await reservaDao_1.ReservaDao.getReservasByInmueble(id_inmueble);
        const puntuaciones = reservas
            .filter((r) => r.puntuacion > 0)
            .map((r) => r.puntuacion);
        const promedio = puntuaciones.length > 0
            ? puntuaciones.reduce((sum, p) => sum + p, 0) / puntuaciones.length
            : null;
        await prisma.inmueble.update({
            where: { id_inmueble },
            data: { puntuacion_promedio: promedio },
        });
    }
}
exports.default = ReservasService;
