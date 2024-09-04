import { Request, Response } from "express";
import PhotoService from '../services/photosService';
const multer = require('multer');

const express = require('express')
const router = express.Router()

router.post('/add', (req: Request, res: Response) => {
    PhotoService.multi_upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Error: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `Error: ${err.message}` } }).end();
            }
            return;
        }
        res.status(200).end('Se han subido los archivos.');
    })
});

module.exports = router;