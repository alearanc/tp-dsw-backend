import { Request, Response } from 'express';
import { verifyToken } from '../authMiddleware';
import Inmueble from '../models/Inmueble';
import Localidad from '../models/Localidad';
import TipoInmueble from '../models/TipoInmueble';
import InmuebleService from '../services/inmuebleService';

const express = require('express');
const router = express.Router();

router.get('/get', async(req: Request, res: Response) => {
  try {
    res.json(await InmuebleService.getAllInmuebles());
  } catch (error) {
    return res.status(404).send(`Error al obtener todos los inmuebles`);
  }
})

router.get('/getMisInmuebles', verifyToken, async(req: any, res: Response) => {
  try {
    res.json(await InmuebleService.getMyInmuebles(parseInt(req.userId)));
  } catch (error) {
    return res.status(404).send(`Error al obtener todos los inmuebles`);
  }
});

router.get('/getInmuebleSinReservas', verifyToken, async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        res.json(await InmuebleService.getInmueblesWithoutUserReservations(userId));
    } catch (error) {
        return res.status(404).send(`Error al obtener inmuebles sin reservas del usuario: ${error}`);
    }
});

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
    const inmueble: Inmueble = req.body;
    const nuevoInmueble = await InmuebleService.addInmueble(inmueble);
    res.json(nuevoInmueble);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/toggleVisibilidad', verifyToken, async (req: any, res: Response) => {
  try {
    res.json(await InmuebleService.toggleVisibilidad(req.body, req.userId));
  } catch (error) {
    return res.status(404).send(`Error al cambiar visibilidad del inmueble.`);
  }
});

router.delete('/delete/:id_inmueble', verifyToken, async (req: any, res: Response) => {
  const id_inmueble = parseInt(req.params.id_inmueble);
  try {
      res.json(await InmuebleService.deleteInmueble(id_inmueble, req.userId));
  } catch (error) {
      return res.status(404).send(`Error al eliminar el inmueble con ID ${req.params.id_inmueble}: ${error}`);
  }
});

router.put('/update/:id_inmueble', verifyToken, async (req: any, res: Response) => {
  const id_inmueble = parseInt(req.params.id_inmueble);
  try {
    const inmuebleExistente = await InmuebleService.getInmuebleById(id_inmueble);
    if (!inmuebleExistente) {
      return res.status(404).send(`No se encontró el inmueble con el ID ${id_inmueble}`);
    }

    const tipoInmueble = new TipoInmueble(
      req.body.tipo_inmueble.id_tipoinmueble,
      req.body.tipo_inmueble.descripcion
    );

    const localidad = new Localidad(
      req.body.localidad.cod_postal,
      req.body.localidad.nombre
    );

    const params: Inmueble = {
      id_inmueble,
      titulo_inmueble: req.body.titulo_inmueble,
      descripcion_inmueble: req.body.descripcion_inmueble,
      precio_noche: parseFloat(req.body.precio_noche),
      direccion_inmueble: req.body.direccion_inmueble,
      capacidad: parseInt(req.body.capacidad),
      tipo_inmueble: tipoInmueble,
      localidad: localidad,
      propietario: req.body.propietario,
      habilitado: req.body.habilitado
    };

    const updatedInmueble = await InmuebleService.updateInmueble(id_inmueble, params, req.userId);
    res.json(updatedInmueble);

  } catch (error) {
    return res.status(404).send(`Error al actualizar el inmueble con ID ${id_inmueble}: ${error}`);
  }
});

module.exports = router;