import { ServicioDao } from "../daos/ServicioDao";
import Servicio from "../models/Servicio";

export default class Servicio{
    static async getAllServicio(): Promise<Servicio[]>{
        return await ServicioDao.getAllServicio()
    }

    static async getServicioById(id_servicio: number): Promise<Servicio[]>{
        return await ServicioDao.getServicioByid_servicio(id_servicio);
    }

    static async addServicio (servicio: servicio): Promise<servicio[]>{
        await ServicioDao.addServicio(servicio);
        return await ServicioDao.getAllServicio();
    }

    static async deleteservicio(id_servicio: number): Promise<void>{
        return await ServicioDao.deleteServicioByid_servicio(id_servicio);
    }

    static async updateServicio(id_servicio: number, descripcion_servicio: string): Promise<Servicio[]>{
        await ServicioDao.updateServicioByid_servicio(id_servicio, descripcion_servicio);
        return await ServicioDao.getAllServicio();
    }

}
