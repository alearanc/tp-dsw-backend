import { Request, Response } from "express";
const multer = require('multer');
const path = require('path');

export default class PhotoService{
    static storage = multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, path.join(__dirname, '../photos/'));
            console.log('Archivo guardado en: ', path.join(__dirname, '../photos/'));
        },
        filename: (req: Request, file: any, cb: any) => {
        cb(null,Date.now() + '-' + file.originalname); // Renombramos el archivo a la fecha de subida
        },
    });

    static multi_upload = multer({
        storage: this.storage,
        limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
        fileFilter: (req: Request, file: any, cb: any) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                const err = new Error('Solo se permiten imágenes de formato .png, .jpg and .jpeg!')
                err.name = 'ExtensionError'
                return cb(err);
            }
        },
    }).array('uploadedImages', 2)
}