import { Request, Response } from "express";
import { verifyToken } from "../authMiddleware";
import ReservasService from "../services/reservaServicer";

const express = require('express')
const router = express.Router()

router.get('/getReservasByInmueble/:idInmueble', async (req: Request, res: Response) => {
    try {
        res.json(await ReservasService.getReservasByInmueble(parseInt(req.params.idInmueble)));
    } catch (error: any) {
        res.send('No se encontró el inmueble.\n' + error);
    }
});

router.get('/getReservas', verifyToken, async (req: any, res: Response) => {
    try {
        res.json(await ReservasService.getReservas(parseInt(req.userId)));
    } catch (error: any) {
        res.send('No se encontraron reservas para el usuario.\n');
    }
});

router.get('/getReservasCanceladas', verifyToken, async (req: any, res: Response) => {
    try {
        res.json(await ReservasService.getReservasCanceladas(parseInt(req.userId)));
    } catch (error: any) {
        res.send('No se encontraron reservas canceladas para el usuario.\n');
    }
});

router.get('/getReservasPasadas', verifyToken, async (req: any, res: Response) => {
    try {
        res.json(await ReservasService.getReservasPasadas(parseInt(req.userId)));
    } catch (error: any) {
        res.send('No se encontraron reservas pasadas para el usuario.\n');
    }
});

router.post('/reservar', verifyToken, async (req: any, res: Response) => {
    try {
        res.json(await ReservasService.reservar(req.body, req.userId));
    } catch (error: any) {
        res.send('Error al agregar registrar la reserva.\n' + error);
    }
});

router.get('/hasFutureReservation/:id_inmueble', verifyToken, async (req: any, res: Response) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const userId = req.userId;
        const hasReservation = await ReservasService.hasFutureReservation(id_inmueble, userId);
        res.json({ hasReservation });
    } catch (error: any) {
        return res.status(404).send(`Error al verificar reservas futuras: ${error}`);
    }
});

router.put('/cancelarReserva', async (req: any, res: Response) => {
    try {
        res.json(await ReservasService.cancelarReserva(req.body));
    } catch (error: any) {
        return res.status(401).send(`Error al cancelar la reserva: ${error}`);
    }
});

module.exports = router;