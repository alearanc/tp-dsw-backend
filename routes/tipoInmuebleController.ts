import { Request, Response } from "express";
import TipoInmuebleService from "../services/tipoInmuebleService";

const express = require('express')
const router = express.Router()

router.get('/getAll', async (req: Request, res: Response) => {
    try {
        res.status(200).json(await TipoInmuebleService.getAllTipoInmueble());
    } catch (error) {
        return res.status(404).send({message: 'Error al listar los Tipos de Inmuebles!'});
    }
});

router.get('/get/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        const idTipoInmueble= await TipoInmuebleService.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble))
        if(!idTipoInmueble){
            return res.status(404).send({message: 'No se encontró el Tipo de Inmueble!'});
        }
        res.status(200).json(await TipoInmuebleService.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble)));

    } catch (error) {
        res.send('No se encontró el Tipo de Inmueble.\n' + error);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.status(200).json(await TipoInmuebleService.addTipoInmueble(req.body));
    } catch (error) {
        res.send('Error al agregar el Tipo de Inmueble.\n' + error);
    }
});

router.delete('/delete/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        const idTipoInmueble= await TipoInmuebleService.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble))
        if(!idTipoInmueble){
            return res.status(404).send({message: 'No se encontró el Tipo de Inmueble!'});
        }
        res.status(200).json(await TipoInmuebleService.deleteTipoInmueble(parseInt(req.params.id_tipoinmueble)));
    } catch (error) {
        res.send('Error al eliminar el Tipo de Inmueble.\n' + error);
    }
});

router.put('/update/:id_tipoinmueble', async (req: Request, res: Response) => {
    try {
        const idTipoInmueble= await TipoInmuebleService.getTipoInmuebleById(parseInt(req.params.id_tipoinmueble))
        if(!idTipoInmueble){
            return res.status(404).send({message: 'No se encontró el Tipo de Inmueble!'});
        }
        res.status(200).json(await TipoInmuebleService.updateTipoInmueble(parseInt(req.params.id_tipoinmueble), req.body.descripcion));
    } catch (error) {
        res.send('Error al actualizar el Tipo de Inmueble.\n' + error);
    }
});

module.exports = router;