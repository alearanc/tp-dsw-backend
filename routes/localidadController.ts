import { Request, Response } from "express";
import LocalidadService from "../services/localidadService";

const express = require('express')
const router = express.Router()

router.get('/getAll', (req: Request, res: Response) => {
    res.json(LocalidadService.getAllLocalidades());
});

router.get('/get/:codigoPostal', (req: Request, res: Response) => {
    res.json(LocalidadService.getLocalidadByCodigoPostal(req.params.codigoPostal));
});

router.post('/add', (req: Request, res: Response) => {
    res.json(LocalidadService.addLocalidad(req.body));
});

router.delete('/delete/:codigoPostal', (req: Request, res: Response) => {
    res.json(LocalidadService.deleteLocalidad(req.params.codigoPostal));
});

router.put('/update/:codigoPostal', (req: Request, res: Response) => {
    res.json(LocalidadService.updateLocalidad(req.params.codigoPostal, req.body.nombre));
});

module.exports = router;