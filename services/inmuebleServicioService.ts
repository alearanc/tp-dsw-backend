import { InmuebleServicioDao } from "../daos/inmuebleServicioDao"; // Importamos el DAO
import { InmuebleServicio } from '@prisma/client'; // Importamos el tipo InmuebleServicio de Prisma

export default class InmuebleServicioService {
  
  static async getServiciosByInmuebleId(id_inmueble: number): Promise<InmuebleServicio[]> {
        return await InmuebleServicioDao.getByInmuebleId(id_inmueble); 
    }
  
    static async addInmuebleServicio(inmuebleServicios: { id_inmueble: number; id_servicio: number }[]): Promise<InmuebleServicio[]> {
        await InmuebleServicioDao.add(inmuebleServicios); 
        return await InmuebleServicioDao.getByInmuebleId(inmuebleServicios[0].id_inmueble);
    }

    static async deleteInmuebleServicio(id_inmueble: number, id_servicio: number): Promise<InmuebleServicio[]> {
        await InmuebleServicioDao.deleteByInmuebleAndServicio(id_inmueble, id_servicio); 
        return await InmuebleServicioDao.getByInmuebleId(id_inmueble); 
    }
}
