import { Request, Response } from "express";
import ReservasService from "../services/reservaServicer";

const express = require('express')
const router = express.Router()

router.get('/getReservasByInmueble/:idInmueble', async (req: Request, res: Response) => {
    try {
        res.json(await ReservasService.getReservasByInmueble(parseInt(req.params.idInmueble)));
    } catch (error) {
        res.send('No se encontró el inmueble.\n' + error);
    }
});

module.exports = router;