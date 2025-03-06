"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipoInmuebleService_1 = __importDefault(require("../services/tipoInmuebleService"));
const authMiddleware_1 = require("../authMiddleware");
const express = require('express');
const router = express.Router();
router.get('/getAll', async (req, res) => {
    try {
        res.status(200).json(await tipoInmuebleService_1.default.getAllTipoInmueble());
    }
    catch (error) {
        return res.status(404).send({ message: 'Error al listar los Tipos de Inmuebles!' });
    }
});
router.get('/get/:id_tipoinmueble', async (req, res) => {
    try {
        const idTipoInmueble = await tipoInmuebleService_1.default.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble));
        if (!idTipoInmueble) {
            return res.status(404).send({ message: 'No se encontró el Tipo de Inmueble!' });
        }
        res.status(200).json(await tipoInmuebleService_1.default.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble)));
    }
    catch (error) {
        res.send('No se encontró el Tipo de Inmueble.\n' + error);
    }
});
router.post('/add', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.status(200).json(await tipoInmuebleService_1.default.addTipoInmueble(req.body));
    }
    catch (error) {
        res.send('Error al agregar el Tipo de Inmueble.\n' + error);
    }
});
router.delete('/delete/:id_tipoinmueble', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        const idTipoInmueble = await tipoInmuebleService_1.default.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble));
        if (!idTipoInmueble) {
            return res.status(404).send({ message: 'No se encontró el Tipo de Inmueble!' });
        }
        res.status(200).json(await tipoInmuebleService_1.default.deleteTipoInmueble(parseInt(req.params.id_tipoinmueble)));
    }
    catch (error) {
        res.send('Error al eliminar el Tipo de Inmueble.\n' + error);
    }
});
router.put('/update/:id_tipoinmueble', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        const idTipoInmueble = await tipoInmuebleService_1.default.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble));
        if (!idTipoInmueble) {
            return res.status(404).send({ message: 'No se encontró el Tipo de Inmueble!' });
        }
        res.status(200).json(await tipoInmuebleService_1.default.updateTipoInmueble(parseInt(req.params.id_tipoinmueble), req.body.descripcion));
    }
    catch (error) {
        res.send('Error al actualizar el Tipo de Inmueble.\n' + error);
    }
});
module.exports = router;
