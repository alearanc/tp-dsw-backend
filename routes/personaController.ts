import { Request, Response } from 'express';
import PersonaService from '../services/personaService';
import { IPersona } from '../interfaces/Persona.interface';

const express = require('express');
const router = express.Router();

//  Manejador de errores genérico
const errorHandler = (res: Response, error: Error, message: string) => {
    res.status(500).send(`${message}: ${error.message}`);
}

router.get('/get', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.getAllPersonas());
    } catch (error) {
        errorHandler(res, error, `Error al obtener todas las personas`);
    }
})

router.get('get/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        
        const persona = await PersonaService.getPersonaById(id_usuario);
        if (!persona) {
            res.status(404).send(`No se encontró la persona con el ID ${id_usuario}`);
            return;
        }
        res.json(persona);
    } catch (error) {
        errorHandler(res, error, `No se encontró la persona con el ID ${id_usuario}`);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.addPersona(req.body));
    } catch (error) {
        errorHandler(res, error, `Error al agregar a la persona`);
    }
});

router.delete('/delete/:id_usuario', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.deletePersona(parseInt(req.params.id_usuario)));
    } catch (error) {
        errorHandler(res, error, `Error al eliminar la persona con ID ${req.params.id_usuario}`);
    }
})

router.put('/update/:id_usuario', async (req: Request, res: Response) => {
    try {
        const params: IPersona = {
            id_usuario: parseInt(req.params.id_usuario),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            tipo_usuario: req.body.tipo_usuario,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
            localidad: req.body.localidad,
        };

        const updatedPersona = await PersonaService.updatePersona(params);
        res.json(updatedPersona);
    } catch (error) {
        errorHandler(res, error, `Error al actualizar la persona con ID ${req.params.id_usuario}`);
    }
});
