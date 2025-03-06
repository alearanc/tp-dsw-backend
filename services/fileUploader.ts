import { Request } from "express";
import multer from "multer";

export default class FileUploader {
    static storage = multer.memoryStorage();

    static multi_upload = multer({
        storage: this.storage,
        limits: { fileSize: 32 * 1024 * 1024 }, // El límite de tamaño en ImgBB es 32MB
        fileFilter: (req: Request, file: any, cb: any) => {
            const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                const err = new Error("Solo se permiten imágenes .png, .jpg o .jpeg");
                err.name = "ExtensionError";
                cb(err);
            }
        },
    }).array("uploadedImages", 2);
}