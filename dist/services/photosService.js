"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const photosDao_1 = require("../daos/photosDao");
const fileUploader_1 = __importDefault(require("../services/fileUploader"));
class PhotoService {
    static upload(req, res, cb) {
        fileUploader_1.default.multi_upload(req, res, cb);
    }
    static async savePhotos(files, inmuebleId) {
        if (!files || files.length === 0) {
            throw new Error('No se han subido archivos.');
        }
        const fotoInmuebles = files.map((file) => ({
            urlFoto: file.filename,
            inmuebleId: inmuebleId
        }));
        try {
            await photosDao_1.PhotosDao.add(fotoInmuebles);
            return photosDao_1.PhotosDao.getByInmuebleId(inmuebleId);
        }
        catch (error) {
            console.error('Error al guardar fotos en la base de datos:', error);
            throw new Error('No se pudieron guardar las fotos.');
        }
    }
    static async getPhotosByInmuebleId(inmuebleId) {
        try {
            return await photosDao_1.PhotosDao.getByInmuebleId(inmuebleId);
        }
        catch (error) {
            console.error('Error al recuperar fotos:', error);
            throw new Error('Error al recuperar fotos.');
        }
    }
    static async deletePhotoById(id_fotoInmueble) {
        try {
            await photosDao_1.PhotosDao.deleteById(id_fotoInmueble);
        }
        catch (error) {
            console.error('Error al eliminar foto:', error);
            throw new Error('Error al eliminar foto.');
        }
    }
}
exports.default = PhotoService;
