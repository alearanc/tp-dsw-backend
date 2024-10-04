import { InmuebleDao } from '../daos/inmuebleDao'
import Inmueble from '../models/Inmueble'

export default class InmuebleService {
    static async getAllInmuebles(): Promise<Inmueble[]> {
        try {
            return await InmuebleDao.getAllInmuebles()
        } catch (error) {
            throw new Error(`Error al obtener todos los inmuebles: ${error}`)
        }
    }
    static async getInmuebleById(id: number): Promise<Inmueble> {
        try {
            return await InmuebleDao.getInmuebleById(id)
        } catch (error) {
            throw new Error(`Error al obtener el inmueble con ID: ${id}: ${error}`)
        }
    }
    static async addInmueble(inmueble: Inmueble, propietario: number, servicios: number[]): Promise<void> {
        try {
            const nuevoInmueble = await InmuebleDao.addInmueble(inmueble, propietario);
            
            await InmuebleDao.agregarServiciosAInmueble(nuevoInmueble.id_inmueble, servicios);
        } catch (error) {
            throw new Error(`Error al agregar el inmueble: ${error}`);
        }
    }
    static async deleteInmueble(id_inmueble: number): Promise<void> {
        try {
            await InmuebleDao.deleteInmueble(id_inmueble)
        } catch (error) {
            throw new Error(
                `Error al eliminar el inmueble con ID ${id_inmueble}: ${error}`
            )
        }
    }
    static async updateInmueble(params: Inmueble): Promise<void> {
        try {
            await InmuebleDao.updateInmueble(params);
            const serviciosIds = params.servicios.map(servicio => servicio.id_servicio);
            await InmuebleDao.actualizarServiciosDeInmueble(params.id_inmueble, serviciosIds);
        } catch (error) {
            throw new Error(`Error al actualizar el inmueble con ID ${params.id_inmueble}: ${error}`);
        }
    }
}
