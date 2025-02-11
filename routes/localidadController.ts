import { Request, Response } from "express";
import LocalidadService from "../services/localidadService";
import { isAdmin, verifyToken } from "../authMiddleware";

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
        res.json(await LocalidadService.getLocalidadByCodigoPostal(parseInt(req.params.codigoPostal)));
    } catch (error) {
        res.send('No se encontró la localidad.\n' + error);
    }
});

router.post('/add', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.addLocalidad(req.body));
    } catch (error) {
        res.send('Error al agregar la localidad.\n' + error);
    }
});

router.delete('/delete/:codigoPostal', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.deleteLocalidad(parseInt(req.params.codigoPostal)));
    } catch (error) {
        res.send('Error al eliminar la localidad.\n' + error);
    }
});

router.put('/update/:codigoPostal', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await LocalidadService.updateLocalidad(parseInt(req.params.codigoPostal), req.body.nombre));
    } catch (error) {
        res.send('Error al actualizar la localidad.\n' + error);
    }
});

module.exports = router;