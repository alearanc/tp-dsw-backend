import { Request, Response } from "express";
import TipoInmuebleService from "../services/tipoInmuebleService";

const express = require('express')
const router = express.Router()

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        res.json(await TipoInmuebleService.getAllTipoInmueble());
    } catch (error) {
        console.error('Error al listar los Tipos de Inmuebles:\n', error);
    }
});

router.get('/get/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        res.json(await TipoInmuebleService.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble)));
    } catch (error) {
        res.send('No se encontró el Tipo de Inmueble.\n' + error);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.json(await TipoInmuebleService.addTipoInmueble(req.body));
    } catch (error) {
        res.send('Error al agregar el Tipo de Inmueble.\n' + error);
    }
});

router.delete('/delete/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        res.json(await TipoInmuebleService.deleteTipoInmueble(parseInt(req.params.id_tipoinmueble)));
    } catch (error) {
        res.send('Error al eliminar el Tipo de Inmueble.\n' + error);
    }
});

router.put('/update/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        res.json(await TipoInmuebleService.updateTipoInmueble(parseInt(req.params.id_tipoinmueble), req.body.descripcion));
    } catch (error) {
        res.send('Error al actualizar el Tipo de Inmueble.\n' + error);
    }
});

module.exports = router;