import { LocalidadDao } from "../daos/localidadDao";
import Localidad from "../models/Localidad";
import { localidades } from "../utils";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let localidadesDummy = localidades;

export default class LocalidadService{

    static async getAllLocalidades(): Promise<Localidad[]>{
        return await LocalidadDao.getAllLocalidades();
    }

    static async getLocalidadByCodigoPostal(id: string): Promise<Localidad[]>{
        return await LocalidadDao.getLocalidadByCodigoPostal(id);
    }

    static async addLocalidad(localidad: Localidad): Promise<Localidad[]>{
        await LocalidadDao.addLocalidad(localidad);
        return await LocalidadDao.getAllLocalidades();
    }

    static async deleteLocalidad(codigoPostal: string): Promise<Localidad[]>{
        await LocalidadDao.deleteLocalidadByCodigoPostal(codigoPostal);
        return await LocalidadDao.getAllLocalidades();
    };

    static async updateLocalidad(codigoPostal: string, descripcion: string): Promise<Localidad[]>{
        await LocalidadDao.updateLocalidad(codigoPostal, descripcion);
        return await LocalidadDao.getAllLocalidades();
    }
}