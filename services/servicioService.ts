import { ServicioDao } from "../daos/ServicioDao";
import Servicio from '../models/Servicio';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let servicioDummy = Servicio;

export default class ServicioService{

    static async getAllservicio(): Promise<Servicio[]>{
        return await ServicioDao.getAllservicio();
    }

    static async getserviciodByid_servicio(id_servicio: number): Promise<Servicio[]>{
        return await ServicioDao.getservicioByid_servicio(id_servicio);
    }

    static async addservicio(servicio: Servicio): Promise<Servicio[]>{
        await ServicioDao.addServicio(servicio);
        return await ServicioDao.getAllservicio();
    }

    static async deleteServicio(id_servicio: number): Promise<Servicio[]>{
        await ServicioDao.deleteservicioByid_servicio(id_servicio);
        return await ServicioDao.getAllservicio();
    };

    static async updateServicio(id_servicio: number, descripcion_servicio: string): Promise<Servicio[]>{
        await ServicioDao.updateservicioByid_servicio(id_servicio, descripcion_servicio);
        return await ServicioDao.getAllservicio();
    }
}