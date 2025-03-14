import { Request, Response } from "express";
import ServicioService from "../services/servicioService";
import { isAdmin, verifyToken } from "../authMiddleware";

const express = require('express')
const router = express.Router()

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        res.json(await ServicioService.getAllservicio());
    } catch (error) {
        console.error('Error al listar los servicios:\n', error);
    }
});

router.get('/get/:id_servicio', async (req: Request, res: Response) => {
    try {
        res.json(await ServicioService.getserviciodByid_servicio(parseInt(req.params.id_servicio)));
    } catch (error) {
        res.send('No se encontró el Servicio.\n' + error);
    }
});

router.post('/add', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await ServicioService.addservicio(req.body));
    } catch (error) {
        res.send('Error al agregar el Servicio.\n' + error);
    }
});

router.delete('/delete/:id_servicio', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await ServicioService.deleteServicio(parseInt(req.params.id_servicio)));
    } catch (error) {
        res.send('Error al eliminar el servicio.\n' + error);
    }
});

router.put('/update/:id_servicio', verifyToken, isAdmin, async (req: Request, res: Response) => {
    try {
        res.json(await ServicioService.updateServicio(parseInt(req.params.id_servicio), req.body.descripcion_servicio));
    } catch (error) {
        res.send('Error al actualizar el servicio.\n' + error);
    }
});

module.exports = router;