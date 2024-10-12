import { Request, Response } from "express";
import InmuebleServicioService from "../services/inmuebleServicioService";

const express = require('express');
const router = express.Router();

router.get('/get/:id_inmueble', async (req: Request, res: Response) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const servicios = await InmuebleServicioService.getServiciosByInmuebleId(id_inmueble);
        res.json(servicios);
    } catch (error) {
        console.error('Error al listar los servicios del inmueble:\n', error);
        res.status(500).send('Error al listar los servicios del inmueble.');
    }
});

// Ruta para agregar la relación entre un inmueble y varios servicios
router.post('/add', async (req: Request, res: Response) => {
    try {
        const inmuebleServicios = req.body; // pasar un array de { id_inmueble, id_servicio }
        const addedInmuebleServicios = await InmuebleServicioService.addInmuebleServicio(inmuebleServicios);
        res.json(addedInmuebleServicios);
    } catch (error) {
        console.error('Error al agregar la relación entre inmuebles y servicios:\n', error);
        res.status(500).send('Error al agregar la relación entre inmuebles y servicios.');
    }
});

router.delete('/delete/:id_inmueble/:id_servicio', async (req: Request, res: Response) => {
    try {
        const id_inmueble = parseInt(req.params.id_inmueble);
        const id_servicio = parseInt(req.params.id_servicio);
        const updatedInmuebleServicios = await InmuebleServicioService.deleteInmuebleServicio(id_inmueble, id_servicio);
        res.json(updatedInmuebleServicios);
    } catch (error) {
        console.error('Error al eliminar la relación entre inmueble y servicio:\n', error);
        res.status(500).send('Error al eliminar la relación entre inmueble y servicio.');
    }
});

module.exports = router;
