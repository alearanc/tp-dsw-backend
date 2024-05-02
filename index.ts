import { Request, Response } from "express";
import TipoInmueble from "./models/TipoInmueble";
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const port = 3000;

let tiposInmuebles: TipoInmueble[] = [
  new TipoInmueble(1, "Hoteles"),
  new TipoInmueble(2, "Departamentos"),
  new TipoInmueble(3, "Habitaciones")
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getAllTiposInmuebles', (req: Request, res: Response) => {
  res.json(tiposInmuebles);
});

app.get('/getTipoInmueble/:id', (req: Request, res: Response) => {
  const tipoInmuebleSeleccionado = tiposInmuebles.filter(tipoIn => tipoIn.idTipoInmueble === parseInt(req.params.id));
  res.json(tipoInmuebleSeleccionado);
});

app.post('/createTipoInmueble', (req: Request, res: Response) => {
  let tipoInmubleCreado = new TipoInmueble(req.body.id, req.body.descripcion);
  tiposInmuebles.push(tipoInmubleCreado);
  res.json(tiposInmuebles);
});

app.delete('/deleteTipoInmueble/:id', (req: Request, res: Response) => {
  tiposInmuebles = tiposInmuebles.filter(tipoIn => tipoIn.idTipoInmueble !== parseInt(req.params.id));
  res.json(tiposInmuebles);
});

app.put('/updateTipoInmueble/:id', (req: Request, res: Response) => {
  let indexInmuebleSeleccionado = tiposInmuebles.findIndex(tipoIn => tipoIn.idTipoInmueble == parseInt(req.params.id));
  tiposInmuebles[indexInmuebleSeleccionado].descripcion = req.body.descripcion;
  res.json(tiposInmuebles);
});

app.listen(port, () => {
  console.log(`App corriendo en: ${port}`);
});