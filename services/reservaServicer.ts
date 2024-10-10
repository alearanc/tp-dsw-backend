import { ReservaDao } from "../daos/reservaDao";
import Reserva from "../models/Reserva";

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

    static async cancelarReserva(reserva: Reserva, userId: number): Promise<Reserva> {
        try {
            return await ReservaDao.cancelarReserva(reserva, userId);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}