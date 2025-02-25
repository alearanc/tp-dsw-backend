import { ReservaDao } from "../daos/reservaDao";
import Reserva from "../models/Reserva";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default class ReservasService{

    static async getReservasByInmueble(id: number): Promise<Reserva[]>{
        return await ReservaDao.getReservasByInmueble(id);
    }

    static async reservar(reserva: Reserva, userId: number) {
        const { inmueble, fecha_inicio, fecha_fin } = reserva;
        // Crear un nuevo objeto reservaInsertar y asignar userId a id_huesped
        const reservaInsertar = {
            fecha_inicio: reserva.fecha_inicio,
            fecha_fin: reserva.fecha_fin,
            estado: reserva.estado,
            observaciones: reserva.observaciones,
            id_inmueble: reserva.inmueble.id_inmueble,
            id_huesped: userId,
        }
        try {
            // Verificar si hay reservas superpuestas
            const isOverlapping = await ReservaDao.checkOverlap(inmueble.id_inmueble, fecha_inicio, fecha_fin);
            if (isOverlapping) {
                throw new Error('La reserva se superpone con otra existente');
            }
    
            // Crear la nueva reserva
            return await ReservaDao.createReserva(reservaInsertar);
        } catch (error: any) {
            throw new Error(`Error al realizar la reserva: ${error.message}`);
        }
    }

    static async hasFutureReservation(id_inmueble: number, userId: number): Promise<boolean> {
        try {
            return await ReservaDao.hasFutureReservation(id_inmueble, userId);
        } catch (error: any) {
            throw new Error(`Error al verificar reservas futuras: ${error}`);
        }
    }

    static async getReservas(userId: number): Promise<Reserva[]> {
        return await ReservaDao.getReservas(userId);
    }

    static async getReservasCanceladas(userId: number): Promise<Reserva[]> {
        return await ReservaDao.getReservasCanceladas(userId);
    }

    static async getReservasPasadas(userId: number): Promise<Reserva[]> {
        return await ReservaDao.getReservasPasadas(userId);
    }

    static async cancelarReserva(reserva: Reserva): Promise<Reserva> {
        try {
            return await ReservaDao.cancelarReserva(reserva);
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

        if (!Number.isInteger(puntuacion) || puntuacion < 1 || puntuacion > 5) {
            throw new Error("La puntuación debe ser un número entero entre 1 y 5");
        }

        try {
            const updatedReserva = await ReservaDao.valorarReserva({
                id_inmueble,
                id_huesped,
                fecha_inicio,
                puntuacion,
            });

            await this.actualizarPromedioInmueble(id_inmueble);

            return updatedReserva;
        } catch (error: any) {
            throw new Error(`Error al valorar la reserva: ${error.message}`);
        }
    }

    static async actualizarPromedioInmueble(id_inmueble: number): Promise<void> {
        const reservas = await ReservaDao.getReservasByInmueble(id_inmueble);
        const puntuaciones = reservas
            .filter((r: any) => r.puntuacion > 0)
            .map((r: any) => r.puntuacion);
    
        const promedio = puntuaciones.length > 0
            ? puntuaciones.reduce((sum: any, p: any) => sum + p, 0) / puntuaciones.length
            : null;
    
        await prisma.inmueble.update({
            where: { id_inmueble },
            data: { puntuacion_promedio: promedio },
        });
    }

}