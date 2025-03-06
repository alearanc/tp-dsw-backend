"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../authMiddleware");
const reservaServicer_1 = __importDefault(require("../services/reservaServicer"));
const express = require('express');
const router = express.Router();
router.get('/getReservasByInmueble/:idInmueble', async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.getReservasByInmueble(parseInt(req.params.idInmueble)));
    }
    catch (error) {
        res.send('No se encontró el inmueble.\n' + error);
    }
});
router.get('/getReservas', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.getReservas(parseInt(req.userId)));
    }
    catch (error) {
        res.send('No se encontraron reservas para el usuario.\n');
    }
});
router.get('/getReservasCanceladas', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.getReservasCanceladas(parseInt(req.userId)));
    }
    catch (error) {
        res.send('No se encontraron reservas canceladas para el usuario.\n');
    }
});
router.get('/getReservasPasadas', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.getReservasPasadas(parseInt(req.userId)));
    }
    catch (error) {
        res.send('No se encontraron reservas pasadas para el usuario.\n');
    }
});
router.post('/reservar', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.reservar(req.body, req.userId));
    }
    catch (error) {
        res.send('Error al agregar registrar la reserva.\n' + error);
    }
});
router.get('/hasFutureReservation/:id_inmueble', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const userId = req.userId;
        const hasReservation = await reservaServicer_1.default.hasFutureReservation(id_inmueble, userId);
        res.json({ hasReservation });
    }
    catch (error) {
        return res.status(404).send(`Error al verificar reservas futuras: ${error}`);
    }
});
router.put('/cancelarReserva', async (req, res) => {
    try {
        res.json(await reservaServicer_1.default.cancelarReserva(req.body));
    }
    catch (error) {
        return res.status(401).send(`Error al cancelar la reserva: ${error}`);
    }
});
router.put('/valorarReserva', authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const { id_inmueble, fecha_inicio, puntuacion } = req.body;
        const userId = req.userId; // Viene del token
        const updatedReserva = await reservaServicer_1.default.valorarReserva({
            id_inmueble,
            id_huesped: userId,
            fecha_inicio: new Date(fecha_inicio),
            puntuacion,
        });
        res.json(updatedReserva);
    }
    catch (error) {
        res.status(400).send(`Error al valorar la reserva: ${error.message}`);
    }
});
module.exports = router;
