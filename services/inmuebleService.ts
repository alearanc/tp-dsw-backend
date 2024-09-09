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
    static async addInmueble(inmueble: Inmueble): Promise<Inmueble> {
        try {
            await InmuebleDao.addInmueble(inmueble)
            return inmueble
        } catch (error) {
            throw new Error(`Error al agregar el inmueble: ${error}`)
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
    static async updateInmueble(params: Inmueble): Promise<Inmueble> {
        try {
            await InmuebleDao.updateInmueble(params)
            return await InmuebleDao.getInmuebleById(params.id_inmueble)
        } catch (error) {
            throw new Error(
                `Error al actualizar el inmueble con ID ${params.id_inmueble}: ${error}`
            )
        }
    }
}
