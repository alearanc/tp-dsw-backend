"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const photosService_1 = __importDefault(require("../services/photosService"));
const express = require('express');
const router = express.Router();
router.post('/add/:inmuebleId', (req, res) => {
    photosService_1.default.upload(req, res, async (err) => {
        if (err instanceof multer_1.default.MulterError) {
            res.status(500).send({ error: { message: `Error: ${err.message}` } }).end();
            return;
        }
        else if (err) {
            if (err.name === 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            }
            else {
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
        const files = req.files;
        if (files) {
            const inmuebles = await photosService_1.default.savePhotos(files, inmuebleId);
            res.status(200).send(inmuebles);
        }
        else {
            res.status(400).send({ error: { message: 'No se han subido archivos.' } }).end();
        }
    });
});
router.get('/get/:inmuebleId', async (req, res) => {
    const inmuebleId = parseInt(req.params.inmuebleId, 10);
    if (isNaN(inmuebleId)) {
        return res.status(400).send({ error: { message: 'ID de inmueble inválido.' } });
    }
    try {
        const photos = await photosService_1.default.getPhotosByInmuebleId(inmuebleId);
        res.status(200).json(photos);
    }
    catch (error) {
        res.status(500).send({ error: { message: error.message } });
    }
});
router.delete('/:id_fotoInmueble', async (req, res) => {
    const id_fotoInmueble = parseInt(req.params.id_fotoInmueble, 10);
    if (isNaN(id_fotoInmueble)) {
        return res.status(400).send({ error: { message: 'ID de foto inválido.' } });
    }
    try {
        await photosService_1.default.deletePhotoById(id_fotoInmueble);
        res.status(200).send({ message: 'Foto eliminada con éxito.' });
    }
    catch (error) {
        res.status(500).send({ error: { message: error.message } });
    }
});
module.exports = router;
