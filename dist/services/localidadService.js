"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localidadDao_1 = require("../daos/localidadDao");
const utils_1 = require("../utils");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let localidadesDummy = utils_1.localidades;
class LocalidadService {
    static async getAllLocalidades() {
        return await localidadDao_1.LocalidadDao.getAllLocalidades();
    }
    static async getLocalidadByCodigoPostal(id) {
        return await localidadDao_1.LocalidadDao.getLocalidadBycod_postal(id);
    }
    static async addLocalidad(localidad) {
        await localidadDao_1.LocalidadDao.addLocalidad(localidad);
        return await localidadDao_1.LocalidadDao.getAllLocalidades();
    }
    static async deleteLocalidad(codigoPostal) {
        await localidadDao_1.LocalidadDao.deleteLocalidadBycod_postal(codigoPostal);
        return await localidadDao_1.LocalidadDao.getAllLocalidades();
    }
    ;
    static async updateLocalidad(codigoPostal, descripcion) {
        await localidadDao_1.LocalidadDao.updateLocalidad(codigoPostal, descripcion);
        return await localidadDao_1.LocalidadDao.getAllLocalidades();
    }
}
exports.default = LocalidadService;
