import { Request, Response } from "express";
import TipoInmuebleService from "../services/tipoInmuebleService";

const express = require('express')
const router = express.Router()

router.get('/getAll', (req: Request, res: Response) => {
    res.json(TipoInmuebleService.getAllTipoInmueble());
});

router.get('/get/:id', (req: Request, res: Response) => {
    res.json(TipoInmuebleService.getTipoInmuebleById(req.params.id));
});

router.post('/add', (req: Request, res: Response) => {
    res.json(TipoInmuebleService.addTipoInmueble(req.body));
});

router.delete('/delete/id', (req: Request, res: Response) => {
    res.json(TipoInmuebleService.deleteTipoInmueble(req.params.id));
});

router.put('/update/:id', (req: Request, res: Response) => {
    res.json(TipoInmuebleService.updateTipoInmueble(req.params.id, req.body.descripcion));
});

module.exports = router;