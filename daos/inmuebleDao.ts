const { PrismaClient } = require('@prisma/client');
import { Reserva } from "@prisma/client";
import Inmueble from "../models/Inmueble";

const prisma = new PrismaClient();

export class InmuebleDao {
  static async addInmueble(inmueble: Inmueble): Promise<Inmueble> {
    try {
      const nuevoInmueble = await prisma.inmueble.create({
        data: {
          titulo_inmueble: inmueble.titulo_inmueble,
          descripcion_inmueble: inmueble.descripcion_inmueble,
          precio_noche: inmueble.precio_noche,
          direccion_inmueble: inmueble.direccion_inmueble,
          capacidad: inmueble.capacidad,
          id_tipoinmueble: 1,
          cod_postal: 2000,
          id_propietario: inmueble.propietario,
        },
      });
      return nuevoInmueble; // Devolvemos con ID
    } catch (error: any) {
      throw new Error(`Error al agregar inmueble: ${error}`);
    }
  }

  static async getInmueblesByLocalidad(idLocalidad: number): Promise<Inmueble[]> {
    try {
        return await prisma.inmueble.findMany({
            where: {
                cod_postal: idLocalidad,
            },
        });
    } catch (error) {
        throw new Error(`Error al obtener inmuebles por localidad: ${error}`);
    }
  }

  static async getInmueblesByTipoInmueble(idTipoInmueble: number): Promise<Inmueble[]> {
      try {
          return await prisma.inmueble.findMany({
              where: {
                  id_tipoinmueble: idTipoInmueble,
              },
          });
      } catch (error) {
          throw new Error(`Error al obtener inmuebles por tipo de inmueble: ${error}`);
      }
  }

  static async toggleVisibilidad(inmueble: Inmueble, UserId: number): Promise<Inmueble> {
    try {
      return await prisma.inmueble.update({
        where: { id_inmueble: inmueble.id_inmueble,
          id_propietario: UserId},
        data: {
          habilitado: !inmueble.habilitado,
        },
      });
    } catch (error) {
      throw new Error(`Error al cambiar la visibilidad del inmueble.`);
    }
  }

  static async getAllInmuebles(): Promise<Inmueble[]> {
    try {
      return (await prisma.inmueble.findMany()) as Inmueble[];
    } catch (error) {
      throw new Error(`Error al obtener todos los inmuebles: ${error}`);
    }
  }

  static async getAllInmueblesById(idUsuario: number): Promise<Inmueble[]> {
    try {
      return await prisma.inmueble.findMany({
        where: {
          id_propietario: idUsuario,
        },
      });
    } catch (error) {
      throw new Error(`Error al obtener todos mis inmuebles: ${error}`);
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
                habilitado: true,
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
