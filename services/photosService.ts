import { FotoInmueble } from '@prisma/client';
import { PhotosDao } from '../daos/photosDao';
const FormData = require('form-data');
const fetch = require('node-fetch');

export default class PhotoService {
    static async uploadToImgBB(file: Express.Multer.File): Promise<string> {
        const formData = new FormData();
        formData.append('image', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype
        });
        
        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
                headers: {
                    ...formData.getHeaders()
                }
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.error?.message || 'Failed to upload to ImgBB');
            }
            return data.data.url;
        } catch (error) {
            console.error('ImgBB upload error:', error);
            throw error;
        }
    }

    static async savePhotos(files: Express.Multer.File[], inmuebleId: number) {
        if (!files || files.length === 0) {
            throw new Error('No se han subido archivos.');
        }

        const uploadPromises = files.map(async (file) => {
            const url = await this.uploadToImgBB(file);
            return {
                urlFoto: url,
                inmuebleId: inmuebleId
            };
        });

        try {
            const fotoInmuebles = await Promise.all(uploadPromises);
            await PhotosDao.add(fotoInmuebles);
            return PhotosDao.getByInmuebleId(inmuebleId);
        } catch (error) {
            console.error('Error al guardar fotos:', error);
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
