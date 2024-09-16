import { Request, Response } from "express";
import PhotoService from '../services/photosService';
import multer, { MulterError } from 'multer';


const express = require('express');
const router = express.Router();

router.post('/add/:inmuebleId', (req: Request, res: Response) => {
    PhotoService.upload(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Error: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name === 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `Error: ${err.message}` } }).end();
            }
            return;
        }

        const inmuebleId = parseInt(req.params.inmuebleId);
        if (!inmuebleId) {
            res.status(400).send({ error: { message: 'El ID del inmueble es requerido.' } }).end();
            return;
        }

        // Verificar y convertir req.files a un tipo manejable
        const files = req.files as Express.Multer.File[] | undefined;
        if (files) {
            await PhotoService.savePhotos(files, inmuebleId);
            res.status(200).send('Se han subido los archivos.');
        } else {
            res.status(400).send({ error: { message: 'No se han subido archivos.' } }).end();
        }
    });
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
        res.status(200).send('Foto eliminada con éxito.');
    } catch (error: any) {
        res.status(500).send({ error: { message: error.message } });
    }
});

module.exports = router;
