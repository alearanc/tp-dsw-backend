const {PrismaClient} = require('@prisma/client');
import Inmueble from "../models/Inmueble";

const prisma = new PrismaClient();

export class InmuebleDao {
  static async addInmueble(inmueble: Inmueble, propietario: number) {
    try {
      return await prisma.inmueble.create({
        data: {
          titulo_inmueble: inmueble.titulo_inmueble,
          descripcion_inmueble: inmueble.descripcion_inmueble,
          precio_noche: inmueble.precio_noche,
          direccion_inmueble: inmueble.direccion_inmueble,
          capacidad: inmueble.capacidad,
          id_tipoinmueble: inmueble.tipoinmueble.id_tipoinmueble,
          cod_postal: inmueble.localidad.cod_postal,
          id_propietario: propietario
        },
      })
    } catch (error) {
      throw new Error(`Error al agregar inmueble: ${error}`)
    }
  }

  static async getAllInmuebles(): Promise<Inmueble[]> {
    try {
      return(await prisma.inmueble.findMany()) as Inmueble[];
    } catch (error) {
      throw new Error(`Error al obtener todos los inmuebles: ${error}`);
    }
  }

  static async getInmuebleById(id_inmueble: number): Promise<Inmueble> {
    try {
      return await prisma.inmueble.findUnique({
        where: {id_inmueble}
      })
    } catch (error) {
      throw new Error(`Error al obtener el inmueble con ID ${id_inmueble}: ${error}`);
    }
  }

  static async deleteInmueble(id_inmueble: number): Promise<void> {
    try {
      await prisma.inmueble.delete({
        where: {id_inmueble}
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
      tipoinmueble,
      localidad,
      propietario
    } = params
  
    try {
      return await prisma.inmueble.update({
        where: {id_inmueble},
        data: {
          titulo_inmueble,
          descripcion_inmueble,
          precio_noche,
          direccion_inmueble,
          capacidad,
          id_tipoinmueble: tipoinmueble.id_tipoinmueble,
          cod_postal: localidad.cod_postal,
          id_propietario: propietario
        },
      })
    } catch (error) {
      throw new Error(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
    }
  }

  static async agregarServiciosAInmueble(inmueble_id: number, servicios_ids: number[]): Promise<void> {
    try {
      await prisma.inmuebleService.createMany({
        data: servicios_ids.map(servicioId => ({
          inmueble_id: inmueble_id,
          servicio_id: servicioId
        })),
      });
    } catch (error) {
      throw new Error(`Error al agregar servicios al inmueble con ID ${inmueble_id}: ${error}`)
    }
  }
  
  static async actualizarServiciosDeInmueble(inmueble_id: number, servicios_ids: number[]): Promise<void> {
    try {
      await prisma.inmuebleService.deleteMany({
        where: {inmueble_id: inmueble_id},
      });
      await prisma.inmuebleService.createMany({
        data: servicios_ids.map(servicio_id => ({
          inmueble_id: inmueble_id,
          servicio_id: servicio_id
        })),
      })
    } catch (error) {
      throw new Error(`Error al actualizar los servicios del inmueble con ID ${inmueble_id}: ${error}`);
    }
  } 
}
