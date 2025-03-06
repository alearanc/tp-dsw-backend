"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServicioDao_1 = require("../daos/ServicioDao");
const Servicio_1 = __importDefault(require("../models/Servicio"));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let servicioDummy = Servicio_1.default;
class ServicioService {
    static async getAllservicio() {
        return await ServicioDao_1.ServicioDao.getAllservicio();
    }
    static async getserviciodByid_servicio(id_servicio) {
        return await ServicioDao_1.ServicioDao.getservicioByid_servicio(id_servicio);
    }
    static async addservicio(servicio) {
        await ServicioDao_1.ServicioDao.addServicio(servicio);
        return await ServicioDao_1.ServicioDao.getAllservicio();
    }
    static async deleteServicio(id_servicio) {
        await ServicioDao_1.ServicioDao.deleteservicioByid_servicio(id_servicio);
        return await ServicioDao_1.ServicioDao.getAllservicio();
    }
    ;
    static async updateServicio(id_servicio, descripcion_servicio) {
        await ServicioDao_1.ServicioDao.updateservicioByid_servicio(id_servicio, descripcion_servicio);
        return await ServicioDao_1.ServicioDao.getAllservicio();
    }
}
exports.default = ServicioService;
