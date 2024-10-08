const { PrismaClient } = require('@prisma/client');
import { Reserva } from "@prisma/client";
import Inmueble from "../models/Inmueble";

const prisma = new PrismaClient();

export class InmuebleDao {
  static async addInmueble(inmueble: Inmueble) {
    try {
      return await prisma.inmueble.create({
        data: {
          titulo_inmueble: inmueble.titulo_inmueble,
          descripcion_inmueble: inmueble.descripcion_inmueble,
          precio_noche: inmueble.precio_noche,
          direccion_inmueble: inmueble.direccion_inmueble,
          capacidad: inmueble.capacidad,
          id_tipoinmueble: inmueble.tipo_inmueble.id_tipoinmueble,
          cod_postal: inmueble.localidad.cod_postal,
          id_propietario: inmueble.propietario
        },
      })
    } catch (error) {
      throw new Error(`Error al agregar inmueble: ${error}`)
    }
  }

  static async getAllInmuebles(): Promise<Inmueble[]> {
    try {
      return (await prisma.inmueble.findMany()) as Inmueble[];
    } catch (error) {
      throw new Error(`Error al obtener todos los inmuebles: ${error}`);
    }
  }

  static async getInmueblesWithoutUserReservations(userId: number): Promise<Inmueble[]> {
    try {
        // Obtener IDs de inmuebles con reservas futuras en estado "RESERVADO" para el usuario actual
        const inmueblesConReservas = await prisma.reserva.findMany({
            where: {
                id_huesped: userId,
                estado: 'RESERVADO',
                fecha_inicio: {
                    gte: new Date(), // Solo reservas futuras
                },
            },
            select: {
                id_inmueble: true,
            },
        });

        const idsInmueblesConReservas = inmueblesConReservas.map((reserva: Reserva) => reserva.id_inmueble);

        // Obtener inmuebles que no están en la lista de IDs con reservas
        return await prisma.inmueble.findMany({
            where: {
                id_inmueble: {
                    notIn: idsInmueblesConReservas,
                },
            },
            include: {
                localidad: true,
                tipo_inmueble: true,
            },
        });
    } catch (error) {
        throw new Error(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
    }
}

  static async getInmuebleById(id_inmueble: number): Promise<Inmueble> {
    try {
      return await prisma.inmueble.findUnique({
        where: { id_inmueble },
        include: {
          localidad: true,
          tipo_inmueble: true,
        },
      })
    } catch (error) {
      throw new Error(`Error al obtener el inmueble con ID ${id_inmueble}: ${error}`);
    }
  }

  static async deleteInmueble(id_inmueble: number): Promise<void> {
    try {
      await prisma.inmueble.delete({
        where: { id_inmueble }
      })
    } catch (error) {
      throw new Error(`Error al eliminar el inmueble con el ID ${id_inmueble}: ${error}`);
    }
  }

  static async updateInmueble(params: Inmueble): Promise<Inmueble> {
    const {
      id_inmueble,
      titulo_inmueble,
      descripcion_inmueble,
      precio_noche,
      direccion_inmueble,
      capacidad,
      tipo_inmueble,
      localidad
    } = params

    try {
      return await prisma.inmueble.update({
        where: { id_inmueble },
        data: {
          titulo_inmueble,
          descripcion_inmueble,
          precio_noche,
          direccion_inmueble,
          capacidad,
          id_tipoinmueble: tipo_inmueble.id_tipoinmueble,
          cod_postal: localidad.cod_postal
        },
      })
    } catch (error) {
      throw new Error(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
    }
  }

}
