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

module.exports = router;