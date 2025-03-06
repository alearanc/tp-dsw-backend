"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const servicioService_1 = __importDefault(require("../services/servicioService"));
const authMiddleware_1 = require("../authMiddleware");
const express = require('express');
const router = express.Router();
router.get('/getAll', async (req, res) => {
    try {
        res.json(await servicioService_1.default.getAllservicio());
    }
    catch (error) {
        console.error('Error al listar los servicios:\n', error);
    }
});
router.get('/get/:id_servicio', async (req, res) => {
    try {
        res.json(await servicioService_1.default.getserviciodByid_servicio(parseInt(req.params.id_servicio)));
    }
    catch (error) {
        res.send('No se encontró el Servicio.\n' + error);
    }
});
router.post('/add', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await servicioService_1.default.addservicio(req.body));
    }
    catch (error) {
        res.send('Error al agregar el Servicio.\n' + error);
    }
});
router.delete('/delete/:id_servicio', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await servicioService_1.default.deleteServicio(parseInt(req.params.id_servicio)));
    }
    catch (error) {
        res.send('Error al eliminar el servicio.\n' + error);
    }
});
router.put('/update/:id_servicio', authMiddleware_1.verifyToken, authMiddleware_1.isAdmin, async (req, res) => {
    try {
        res.json(await servicioService_1.default.updateServicio(parseInt(req.params.id_servicio), req.body.descripcion_servicio));
    }
    catch (error) {
        res.send('Error al actualizar el servicio.\n' + error);
    }
});
module.exports = router;
