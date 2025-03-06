"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localidadService_1 = __importDefault(require("../services/localidadService"));
const authMiddleware_1 = require("../authMiddleware");
const express = require('express');
const router = express.Router();
router.get('/getAll', async (req, res) => {
    try {
        res.json(await localidadService_1.default.getAllLocalidades());
    }
    catch (error) {
        console.error('Error al listar las localidades:\n', error);
    }
});
router.get('/get/:codigoPostal', async (req, res) => {
    try {
        res.json(await localidadService_1.default.getLocalidadByCodigoPostal(parseInt(req.params.codigoPostal)));
    }
    catch (error) {
        res.send('No se encontró la localidad.\n' + error);
    }
});
router.post('/add', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await localidadService_1.default.addLocalidad(req.body));
    }
    catch (error) {
        res.send('Error al agregar la localidad.\n' + error);
    }
});
router.delete('/delete/:codigoPostal', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await localidadService_1.default.deleteLocalidad(parseInt(req.params.codigoPostal)));
    }
    catch (error) {
        res.send('Error al eliminar la localidad.\n' + error);
    }
});
router.put('/update/:codigoPostal', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await localidadService_1.default.updateLocalidad(parseInt(req.params.codigoPostal), req.body.nombre));
    }
    catch (error) {
        res.send('Error al actualizar la localidad.\n' + error);
    }
});
module.exports = router;
