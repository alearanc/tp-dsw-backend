"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inmuebleServicioService_1 = __importDefault(require("../services/inmuebleServicioService"));
const express = require('express');
const router = express.Router();
router.get('/get/:id_inmueble', async (req, res) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const servicios = await inmuebleServicioService_1.default.getServiciosByInmuebleId(id_inmueble);
        res.json(servicios);
    }
    catch (error) {
        console.error('Error al listar los servicios del inmueble:\n', error);
        res.status(500).send('Error al listar los servicios del inmueble.');
    }
});
// Ruta para agregar la relación entre un inmueble y varios servicios
router.post('/add', async (req, res) => {
    try {
        const inmuebleServicios = req.body; // pasar un array de { id_inmueble, id_servicio }
        const addedInmuebleServicios = await inmuebleServicioService_1.default.addInmuebleServicio(inmuebleServicios);
        res.json(addedInmuebleServicios);
    }
    catch (error) {
        console.error('Error al agregar la relación entre inmuebles y servicios:\n', error);
        res.status(500).send('Error al agregar la relación entre inmuebles y servicios.');
    }
});
router.delete('/delete/:id_inmueble/:id_servicio', async (req, res) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const id_servicio = parseInt(req.params.id_servicio);
        const updatedInmuebleServicios = await inmuebleServicioService_1.default.deleteInmuebleServicio(id_inmueble, id_servicio);
        res.json(updatedInmuebleServicios);
    }
    catch (error) {
        console.error('Error al eliminar la relación entre inmueble y servicio:\n', error);
        res.status(500).send('Error al eliminar la relación entre inmueble y servicio.');
    }
});
module.exports = router;
