import { Request, Response } from "express";
import LocalidadService from "../services/localidadService";

const express = require('express')
const router = express.Router()

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.getAllLocalidades());
    } catch (error) {
        console.error('Error al listar las localidades:\n', error);
    }
});

router.get('/get/:codigoPostal', async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.getLocalidadByCodigoPostal(req.params.codigoPostal));
    } catch (error) {
        res.send('No se encontró la localidad.\n' + error);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.addLocalidad(req.body));
    } catch (error) {
        res.send('Error al agregar la localidad.\n' + error);
    }
});

router.delete('/delete/:codigoPostal', async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.deleteLocalidad(req.params.codigoPostal));
    } catch (error) {
        res.send('Error al eliminar la localidad.\n' + error);
    }
});

router.put('/update/:codigoPostal', async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.updateLocalidad(req.params.codigoPostal, req.body.nombre));
    } catch (error) {
        res.send('Error al actualizar la localidad.\n' + error);
    }
});

module.exports = router;