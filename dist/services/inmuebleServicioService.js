"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inmuebleServicioDao_1 = require("../daos/inmuebleServicioDao"); // Importamos el DAO
class InmuebleServicioService {
    static async getServiciosByInmuebleId(id_inmueble) {
        return await inmuebleServicioDao_1.InmuebleServicioDao.getByInmuebleId(id_inmueble);
    }
    static async addInmuebleServicio(inmuebleServicios) {
        await inmuebleServicioDao_1.InmuebleServicioDao.add(inmuebleServicios);
        return await inmuebleServicioDao_1.InmuebleServicioDao.getByInmuebleId(inmuebleServicios[0].id_inmueble);
    }
    static async deleteInmuebleServicio(id_inmueble, id_servicio) {
        await inmuebleServicioDao_1.InmuebleServicioDao.deleteByInmuebleAndServicio(id_inmueble, id_servicio);
        return await inmuebleServicioDao_1.InmuebleServicioDao.getByInmuebleId(id_inmueble);
    }
}
exports.default = InmuebleServicioService;
