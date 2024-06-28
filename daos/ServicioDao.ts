const {PrismaClient} = require('@prisma/client');
import Servicio from '../models/Servicio';
const prisma = new PrismaClient();

export class ServicioDao {
  static async addServicio (servicio: Servicio){
    await prisma.Servicio.create({  
      data: {
          id_servicio: servicio.id_servicio,
          descripcion_servicio: servicio.descripcion_servicio
      }
    });
  }

  static async getAllservicio(): Promise<Servicio[]>{
      const servicio= await prisma.servicio.findMany();
      return <Servicio[]> servicio;
  }

  static async getservicioByid_servicio(id_servicio: number): Promise<Servicio[]>{
    const servicio = await prisma.servcio.findUnique({
        where: { id_servicio : id_servicio },
    });
    return servicio;
  }

  static async deleteservcioByid_servicio(id_servicio: number): Promise<void>{
    await prisma.servicio.delete({
        where: { id_servicio: id_servicio },
    });
  }

  static async updateservicioByid_servicio(id_servicio: number, descripcion_servicio: string): Promise<Servicio | null>{
    const updateservicio = await prisma.servicio.update({
      data: {descripcion_servicio : descripcion_servicio },
      where: { id_servicio : id_servicio },
    });
    return updateservicio;
  }

}