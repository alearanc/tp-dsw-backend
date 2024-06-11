const { PrismaClient } = require('@prisma/client');
import Localidad from '../models/Localidad';
const prisma = new PrismaClient();

export class LocalidadDao{
    static async addLocalidad(localidad: Localidad){
        await prisma.Localidad.create({
            data: {
                cod_postal: localidad.cod_postal,
                nombre: localidad.nombre,
            }
        });
    }

    static async getAllLocalidades(): Promise<Localidad[]>{
        const localidades = await prisma.Localidad.findMany();
        return <Localidad[]> localidades;
    }

    static async getLocalidadBycod_postal(cod_postal: string): Promise<Localidad[]>{
        const localidad = await prisma.localidad.findUnique({
            where: { cod_postal: cod_postal },
        });
        return localidad;
    }

    static async deleteLocalidadBycod_postal(cod_postal: string): Promise<void> {
        await prisma.localidad.delete({
            where: { cod_postal: cod_postal },
        });
    }

    static async updateLocalidad(cod_postal: string, nombre: string): Promise<Localidad | null> {
        const updatedLocalidad = await prisma.localidad.update({
            where: { cod_postal: cod_postal },
            data: { nombre: nombre },
        });
        return updatedLocalidad;
    }
}