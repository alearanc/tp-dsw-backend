"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tipoInmuebleDao_1 = require("../daos/tipoInmuebleDao");
class TipoInmuebleService {
    static async getAllTipoInmueble() {
        return await tipoInmuebleDao_1.TipoInmuebleDao.getAllTipoInmueble();
    }
    static async getTipoInmuebleById(id_tipoinmueble) {
        return await tipoInmuebleDao_1.TipoInmuebleDao.getTipoInmuebleByid_tipoinmueble(id_tipoinmueble);
    }
    static async addTipoInmueble(tipoInmueble) {
        await tipoInmuebleDao_1.TipoInmuebleDao.addTipoInmueble(tipoInmueble);
        return await tipoInmuebleDao_1.TipoInmuebleDao.getAllTipoInmueble();
    }
    static async deleteTipoInmueble(id_tipoinmueble) {
        await tipoInmuebleDao_1.TipoInmuebleDao.deleteTipoInmuebleByid_tipoinmueble(id_tipoinmueble);
        return await tipoInmuebleDao_1.TipoInmuebleDao.getAllTipoInmueble();
    }
    static async updateTipoInmueble(id_tipoinmueble, descripcion) {
        await tipoInmuebleDao_1.TipoInmuebleDao.updateTipoInmuebleByid_tipoinmueble(id_tipoinmueble, descripcion);
        return await tipoInmuebleDao_1.TipoInmuebleDao.getAllTipoInmueble();
    }
}
exports.default = TipoInmuebleService;
