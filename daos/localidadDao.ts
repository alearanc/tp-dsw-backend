const { PrismaClient } = require('@prisma/client');
import Localidad from '../models/Localidad';
const prisma = new PrismaClient();

export class LocalidadDao{
    static async addLocalidad(localidad: Localidad){
        await prisma.Localidad.create({
            data: {
                cod_postal: localidad.codigoPostal,
                nombre: localidad.nombre,
            }
        });
    }

    static async getAllLocalidades(): Promise<Localidad[]>{
        const localidades = await prisma.Localidad.findMany();
        return <Localidad[]> localidades;
    }

    static async getLocalidadByCodigoPostal(codigoPostal: string): Promise<Localidad[]>{
        const localidad = await prisma.localidad.findUnique({
            where: { cod_postal: codigoPostal },
        });
        return localidad;
    }

    static async deleteLocalidadByCodigoPostal(codigoPostal: string): Promise<void> {
        await prisma.localidad.delete({
            where: { cod_postal: codigoPostal },
        });
    }

    static async updateLocalidad(codigoPostal: string, nombre: string): Promise<Localidad | null> {
        const updatedLocalidad = await prisma.localidad.update({
            where: { cod_postal: codigoPostal },
            data: { nombre: nombre },
        });
        return updatedLocalidad;
    }
}