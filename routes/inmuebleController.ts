import { Request, Response } from 'express';
import InmuebleService from '../services/inmuebleService';
import Inmueble from '../models/Inmueble';
import TipoInmueble from '../models/TipoInmueble';
import Localidad from '../models/Localidad';
import Servicio from '../models/Servicio';

const express = require('express');
const router = express.Router();

router.get('/get', async(req: Request, res: Response) => {
  try {
    res.json(await InmuebleService.getAllInmuebles());
  } catch (error) {
    return res.status(404).send(`Error al obtener todos los inmuebles`);
  }
})

router.get('/get/:id_inmueble', async (req: Request, res: Response) => {
  const id_inmueble = parseInt(req.params.id_inmueble);
  try {
    const inmueble = await InmuebleService.getInmuebleById(id_inmueble);
    if (!inmueble) {
      res.status(404).send(`No se encontró el inmueble con el ID ${id_inmueble}`);
      return;
    }
    res.json(inmueble);
  } catch (error) {
    return res.status(404).send(`Error al obtener el inmueble con ID ${id_inmueble}: ${error}`)
  }
});

router.post('/add', async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const tipoInmueble = new TipoInmueble(
      req.body.tipoInmueble.id_tipoinmueble,
      req.body.tipoInmueble.descripcion
    );

    const localidad = new Localidad(
      req.body.localidad.cod_postal,
      req.body.localidad.nombre
    );

    const propietario = req.body.propietario;



    const inmueble = new Inmueble(
      0,  //  ID autogenerado
      req.body.titulo_inmueble,
      req.body.descripcion_inmueble,
      parseFloat(req.body.precio_noche),
      req.body.direccion_inmueble,
      parseInt(req.body.capacidad),
      tipoInmueble,
      localidad,
      propietario,
      []
    );

    const serviciosIds = req.body.servicios || [];

    await InmuebleService.addInmueble(inmueble, propietario, serviciosIds);
    res.status(201).send();
  } catch (error) {
    return res.status(400).send(`Error al agregar el inmueble: ${error}`);
  }
});

router.delete('/delete/:id_inmueble', async (req: Request, res: Response) => {
  const id_inmueble = parseInt(req.params.id_inmueble);
  try {
    res.json(await InmuebleService.deleteInmueble(id_inmueble));
  } catch (error) {
    return res.status(404).send(`Error al eliminar el inmueble con ID ${req.params.id_inmueble}: ${error}`);
  }
});

router.put('/update/:id_inmueble', async (req: Request, res: Response) => {
  const id_inmueble = parseInt(req.params.id_inmueble);
  try {
    const inmuebleExistente = await InmuebleService.getInmuebleById(id_inmueble);
    if (!inmuebleExistente) {
      return res.status(404).send(`No se encontró el inmueble con el ID ${id_inmueble}`);
    }

    const tipoInmueble = new TipoInmueble(
      req.body.tipoinmueble.id_tipoinmueble,
      req.body.tipoinmueble.descripcion
    );

    const localidad = new Localidad(
      req.body.localidad.cod_postal,
      req.body.localidad.nombre
    );

    const propietario = req.body.propietario;

    const servicios = req.body.servicios || [];

    const params: Inmueble = {
      id_inmueble,
      titulo_inmueble: req.body.titulo_inmueble,
      descripcion_inmueble: req.body.descripcion_inmueble,
      precio_noche: parseFloat(req.body.precio_noche),
      direccion_inmueble: req.body.direccion_inmueble,
      capacidad: parseInt(req.body.capacidad),
      tipoinmueble: tipoInmueble,
      localidad: localidad,
      propietario,
      servicios
    };

    await InmuebleService.updateInmueble(params);
    res.status(200).send();
  } catch (error) {
    return res.status(400).send(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
  }
});

module.exports = router;