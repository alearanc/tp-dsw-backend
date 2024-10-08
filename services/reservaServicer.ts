import { ReservaDao } from "../daos/reservaDao";
import Reserva from "../models/Reserva";

export default class ReservasService{

    static async getReservasByInmueble(id: number): Promise<Reserva[]>{
        return await ReservaDao.getReservasByInmueble(id);
    }

}