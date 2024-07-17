const {PrismaClient} = require('@prisma/client');
import TipoInmueble from '../models/TipoInmueble';
const prisma = new PrismaClient();

export class TipoInmuebleDao {
  static async addTipoInmueble (tipoInmueble: TipoInmueble){
    await prisma.TipoInmueble.create({  
      data: {
          descripcion: tipoInmueble.descripcion
      }
    });
  }

  static async getAllTipoInmueble(): Promise<TipoInmueble[]>{
      const tipoInmueble= await prisma.TipoInmueble.findMany();
      return <TipoInmueble[]> tipoInmueble;
  }

  static async getTipoInmuebleByid_tipoinmueble(id_tipoinmueble: number): Promise<TipoInmueble[]>{
    const tipoinmueble = await prisma.TipoInmueble.findUnique({
        where: { id_tipoinmueble : id_tipoinmueble },
    });
    return tipoinmueble;
  }

  static async deleteTipoInmuebleByid_tipoinmueble(id_tipoinmueble: number): Promise<void>{
    await prisma.TipoInmueble.delete({
        where: { id_tipoinmueble : id_tipoinmueble },
    });
  }

  static async updateTipoInmuebleByid_tipoinmueble(id_tipoinmueble: number, descripcion: string): Promise<TipoInmueble | null>{
    const updatetipoinmueble = await prisma.TipoInmueble.update({
      data: {descripcion : descripcion },
      where: { id_tipoinmueble : id_tipoinmueble },
    });
    return updatetipoinmueble;
  }

}