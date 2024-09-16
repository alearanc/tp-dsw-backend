import { Request, Response } from 'express';
import FileUploader from '../services/fileUploader';
import { PhotosDao } from '../daos/photosDao';
import { FotoInmueble } from '@prisma/client';

export default class PhotoService {
    static upload(req: Request, res: Response, cb: any) {
        FileUploader.multi_upload(req, res, cb);
    }

    static async savePhotos(files: Express.Multer.File[], inmuebleId: number) {
        if (!files || files.length === 0) {
            throw new Error('No se han subido archivos.');
        }

        const fotoInmuebles = files.map((file) => ({
            urlFoto: file.filename,
            inmuebleId: inmuebleId
        }));

        try {
            await PhotosDao.add(fotoInmuebles);
            console.log('Fotos guardadas en la base de datos');
        } catch (error) {
            console.error('Error al guardar fotos en la base de datos:', error);
            throw new Error('No se pudieron guardar las fotos.');
        }
    }

    static async getPhotosByInmuebleId(inmuebleId: number): Promise<FotoInmueble[]> {
        try {
            return await PhotosDao.getByInmuebleId(inmuebleId);
        } catch (error) {
            console.error('Error al recuperar fotos:', error);
            throw new Error('Error al recuperar fotos.');
        }
    }

    static async deletePhotoById(id_fotoInmueble: number): Promise<void> {
        try {
            await PhotosDao.deleteById(id_fotoInmueble);
        } catch (error) {
            console.error('Error al eliminar foto:', error);
            throw new Error('Error al eliminar foto.');
        }
    }
}
