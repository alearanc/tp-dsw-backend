"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../authMiddleware");
const Localidad_1 = __importDefault(require("../models/Localidad"));
const TipoInmueble_1 = __importDefault(require("../models/TipoInmueble"));
const inmuebleService_1 = __importDefault(require("../services/inmuebleService"));
const express = require('express');
const router = express.Router();
router.get('/get', async (req, res) => {
    try {
        res.json(await inmuebleService_1.default.getAllInmuebles());
    }
    catch (error) {
        return res.status(404).send(`Error al obtener todos los inmuebles`);
    }
});
router.get('/getMisInmuebles', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await inmuebleService_1.default.getMyInmuebles(parseInt(req.userId)));
    }
    catch (error) {
        return res.status(404).send(`Error al obtener todos los inmuebles`);
    }
});
router.get('/getInmuebleSinReservas', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        res.json(await inmuebleService_1.default.getInmueblesWithoutUserReservations(userId));
    }
    catch (error) {
        return res.status(404).send(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
    }
});
router.get('/get/:id_inmueble', async (req, res) => {
    const id_inmueble = parseInt(req.params.id_inmueble);
    try {
        const inmueble = await inmuebleService_1.default.getInmuebleById(id_inmueble);
        if (!inmueble) {
            res.status(404).send(`No se encontró el inmueble con el ID ${id_inmueble}`);
            return;
        }
        res.json(inmueble);
    }
    catch (error) {
        return res.status(404).send(`Error al obtener el inmueble con ID ${id_inmueble}: ${error}`);
    }
});
router.get('/search/:criteria', async (req, res) => {
    const criteria = req.params.criteria;
    try {
        const inmuebles = await inmuebleService_1.default.searchInmuebles(criteria);
        res.json(inmuebles);
    }
    catch (error) {
        return res.status(404).send(`Error al buscar inmuebles: ${error}`);
    }
});
router.get('/getByLocalidad/:idLocalidad', async (req, res) => {
    const idLocalidad = parseInt(req.params.idLocalidad);
    try {
        const inmuebles = await inmuebleService_1.default.getInmueblesByLocalidad(idLocalidad);
        res.json(inmuebles);
    }
    catch (error) {
        return res.status(404).send(`Error al obtener inmuebles por localidad: ${error}`);
    }
});
router.get('/getByTipoInmueble/:idTipoInmueble', async (req, res) => {
    const idTipoInmueble = parseInt(req.params.idTipoInmueble);
    try {
        const inmuebles = await inmuebleService_1.default.getInmueblesByTipoInmueble(idTipoInmueble);
        res.json(inmuebles);
    }
    catch (error) {
        return res.status(404).send(`Error al obtener inmuebles por tipo de inmueble: ${error}`);
    }
});
router.post('/add', async (req, res) => {
    try {
        const inmueble = req.body;
        const nuevoInmueble = await inmuebleService_1.default.addInmueble(inmueble);
        res.json(nuevoInmueble);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/toggleVisibilidad', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await inmuebleService_1.default.toggleVisibilidad(req.body, req.userId));
    }
    catch (error) {
        return res.status(404).send(`Error al cambiar visibilidad del inmueble.`);
    }
});
router.delete('/delete/:id_inmueble', authMiddleware_1.verifyToken, async (req, res) => {
    const id_inmueble = parseInt(req.params.id_inmueble);
    try {
        res.json(await inmuebleService_1.default.deleteInmueble(id_inmueble, req.userId));
    }
    catch (error) {
        return res.status(404).send(`Error al eliminar el inmueble con ID ${req.params.id_inmueble}: ${error}`);
    }
});
router.put('/update/:id_inmueble', authMiddleware_1.verifyToken, async (req, res) => {
    const id_inmueble = parseInt(req.params.id_inmueble);
    try {
        const inmuebleExistente = await inmuebleService_1.default.getInmuebleById(id_inmueble);
        if (!inmuebleExistente) {
            return res.status(404).send(`No se encontró el inmueble con el ID ${id_inmueble}`);
        }
        const tipoInmueble = new TipoInmueble_1.default(req.body.tipo_inmueble.id_tipoinmueble, req.body.tipo_inmueble.descripcion);
        const localidad = new Localidad_1.default(req.body.localidad.cod_postal, req.body.localidad.nombre);
        const params = {
            id_inmueble,
            titulo_inmueble: req.body.titulo_inmueble,
            descripcion_inmueble: req.body.descripcion_inmueble,
            precio_noche: parseFloat(req.body.precio_noche),
            direccion_inmueble: req.body.direccion_inmueble,
            capacidad: parseInt(req.body.capacidad),
            tipo_inmueble: tipoInmueble,
            localidad: localidad,
            propietario: req.body.propietario,
            habilitado: req.body.habilitado
        };
        const updatedInmueble = await inmuebleService_1.default.updateInmueble(id_inmueble, params, req.userId);
        res.json(updatedInmueble);
    }
    catch (error) {
        return res.status(404).send(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
    }
});
module.exports = router;
