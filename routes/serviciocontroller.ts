import { Request, Response } from "express";
import servicioService from "../services/servicioService";

const express = require('express')
const router = express.Router()

router.get('/getAll', (req: Request, res: Response) => {
    res.json(servicioService.getAllServicio());
});

router.get('/get/:id', (req: Request, res: Response) => {
    res.json(ServicioService.getServicioById(req.params.id));
});

router.post('/add', (req: Request, res: Response) => {
    res.json(ServicioService.addServicio(req.body));
});

router.delete('/delete/id', (req: Request, res: Response) => {
    res.json(ServicioService.deleteServicio(req.params.id));
});

router.put('/update/:id', (req: Request, res: Response) => {
    res.json(ServicioService.updateServicio(req.params.id, req.body.descripcion));
});

module.exports = router;
