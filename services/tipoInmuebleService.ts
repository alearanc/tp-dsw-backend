import { TipoInmuebleDao } from "../daos/tipoInmuebleDao";
import TipoInmueble from "../models/TipoInmueble";

export default class TipoInmuebleService{
    static async getAllTipoInmueble(): Promise<TipoInmueble[]>{
        return await TipoInmuebleDao.getAllTipoInmueble()
    }

    static async getTipoInmuebleById(id_tipoinmueble: number): Promise<TipoInmueble[]>{
        return await TipoInmuebleDao.getTipoInmuebleByid_tipoinmueble(id_tipoinmueble);
    }

    static async addTipoInmueble (tipoInmueble: TipoInmueble): Promise<TipoInmueble[]>{
        await TipoInmuebleDao.addTipoInmueble(tipoInmueble);
        return await TipoInmuebleDao.getAllTipoInmueble();
    }

    static async deleteTipoInmueble(id_tipoinmueble: number): Promise<TipoInmueble[]>{
        await TipoInmuebleDao.deleteTipoInmuebleByid_tipoinmueble(id_tipoinmueble);
        return await TipoInmuebleDao.getAllTipoInmueble();
    }

    static async updateTipoInmueble(id_tipoinmueble: number, descripcion: string): Promise<TipoInmueble[]>{
        await TipoInmuebleDao.updateTipoInmuebleByid_tipoinmueble(id_tipoinmueble, descripcion);
        return await TipoInmuebleDao.getAllTipoInmueble();
    }

}