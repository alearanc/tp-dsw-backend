import { Request, Response } from "express";
import multer from 'multer';
import PhotoService from '../services/photosService';


const express = require('express');
const router = express.Router();

router.post('/add/:inmuebleId', async (req: Request, res: Response) => {
    try {
        const inmuebleId = parseInt(req.params.inmuebleId);
        if (!inmuebleId) {
            return res.status(400).send({ error: { message: 'El ID del inmueble es requerido.' } });
        }

        const files = req.files as Express.Multer.File[] | undefined;
        if (!files || files.length === 0) {
            return res.status(400).send({ error: { message: 'No se han subido archivos.' } });
        }

        const inmuebles = await PhotoService.savePhotos(files, inmuebleId);
        res.status(200).send(inmuebles);
    } catch (err: any) {
        res.status(500).send({ error: { message: `Error: ${err.message}` } });
    }
});

router.get('/get/:inmuebleId', async (req: Request, res: Response) => {
    const inmuebleId = parseInt(req.params.inmuebleId, 10);
    if (isNaN(inmuebleId)) {
        return res.status(400).send({ error: { message: 'ID de inmueble inválido.' } });
    }

    try {
        const photos = await PhotoService.getPhotosByInmuebleId(inmuebleId);
        res.status(200).json(photos);
    } catch (error: any) {
        res.status(500).send({ error: { message: error.message } });
    }
});

router.delete('/:id_fotoInmueble', async (req: Request, res: Response) => {
    const id_fotoInmueble = parseInt(req.params.id_fotoInmueble, 10);
    if (isNaN(id_fotoInmueble)) {
        return res.status(400).send({ error: { message: 'ID de foto inválido.' } });
    }

    try {
        await PhotoService.deletePhotoById(id_fotoInmueble);
        res.status(200).send({message: 'Foto eliminada con éxito.'});
    } catch (error: any) {
        res.status(500).send({ error: { message: error.message } });
    }
});

module.exports = router;
