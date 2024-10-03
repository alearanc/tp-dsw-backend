import { Request, Response } from 'express';
import Persona from '../models/Persona';
import PersonaService from '../services/personaService';

const express = require('express');
const router = express.Router();

router.get('/get', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.getAllPersonas());
    } catch (error) {
        return res.status(401).send(`Error al obtener todas las personas`);
    }
})

router.get('/get/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        
        const persona = await PersonaService.getPersonaById(id_usuario);
        if (!persona) {
            res.status(401).send(`No se encontró la persona con el ID ${id_usuario}`);
            return;
        }
        res.json(persona);
    } catch (error) {
        return res.status(401).send(`Error al obtener la persona con el ID ${id_usuario}: ${error}`);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
        res.json(await PersonaService.addPersona(req.body));
    } catch (error: any) {
        if (error.message === 'El email ya está registrado') {
            return res.status(400).send('El email ya está registrado');
        }
        return res.status(404).send(`Error al agregar a la persona: ${error}`);
    }
});

router.delete('/delete/:id_usuario', async (req: Request, res: Response) => {
    const id_usuario = parseInt(req.params.id_usuario);
    try {
        res.json(await PersonaService.deletePersona(id_usuario));
    } catch (error) {
        return res.status(401).send(`Error al eliminar la persona con ID ${req.params.id_usuario}: ${error}`);
    }
})

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const token = await PersonaService.signin(email, password);
        if (!token) {
            return res.status(401).send('Credenciales inválidas');
        }
        res.json({ token });
    } catch (error) {
        return res.status(500).send(`Error al iniciar sesión: ${error}`);
    }
});

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

router.post('/recover_account', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        await PersonaService.recoverAccount(email);
        res.send('Correo de recuperación enviado');
    } catch (error) {
        return res.status(401).send(`Error al recuperar la cuenta: ${error}`);
    }
});

router.post('/reset_password', async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    try {
        await PersonaService.resetPassword(token, newPassword);
        res.json({ message: 'Contraseña actualizada' });
    } catch (error: any) {
        return res.status(500).json({ error: `Error al restablecer la contraseña: ${error.message}` });
    }
});

module.exports = router;
