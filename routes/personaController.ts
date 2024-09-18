import { Request, Response } from 'express';
import PersonaService from '../services/personaService';
import Persona from '../models/Persona';

const express = require('express');
const router = express.Router();

router.get('/get', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.getAllPersonas());
    } catch (error) {
        return res.status(404).send(`Error al obtener todas las personas`);
    }
})

router.get('/get/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        
        const persona = await PersonaService.getPersonaById(id_usuario);
        if (!persona) {
            res.status(404).send(`No se encontró la persona con el ID ${id_usuario}`);
            return;
        }
        res.json(persona);
    } catch (error) {
        return res.status(404).send(`Error al obtener la persona con el ID ${id_usuario}: ${error}`);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.addPersona(req.body));
    } catch (error) {
        return res.status(404).send(`Error al agregar a la persona: ${error}`);
    }
});

router.delete('/delete/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        res.json(await PersonaService.deletePersona(id_usuario));
    } catch (error) {
        return res.status(404).send(`Error al eliminar la persona con ID ${req.params.id_usuario}: ${error}`);
    }
})

router.put('/update/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        const personaExistente = await PersonaService.getPersonaById(id_usuario);

        if (!personaExistente) {
            return res.status(400).send({message: 'No se encontro el usuario!'});
        }
        
        const params: Persona = {
            id_usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
            tipo_usuario: req.body.tipo_usuario,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
        };

        const personaActualizada = await PersonaService.updatePersona(params);
        return res.status(200).json(personaActualizada);
    } catch (error) {
        return res.status(500).send(`Error al actualizar la persona con ID ${req.params.id_usuario}: ${error}`);
    }
});

module.exports = router;
