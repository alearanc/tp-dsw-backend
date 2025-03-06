"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const tipoInmuebleRoute = require("./routes/tipoInmuebleController");
const localidadRoute = require("./routes/localidadController");
const servicioRoute = require("./routes/servicioController");
const personaRoute = require("./routes/personaController");
const inmuebleRoute = require("./routes/inmuebleController");
const photoRoute = require("./routes/photosController");
const reservaRoute = require("./routes/reservaController");
const inmuebleServicioRoute = require('./routes/inmuebleServicioController');
var cors = require('cors');
const express = require('express');
const app = express();
const path_1 = __importDefault(require("path"));
const port = 3000;
app.use(cors());
app.use('/photos', express.static(path_1.default.join(__dirname, 'photos')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/tipoInmueble', tipoInmuebleRoute);
app.use('/localidad', localidadRoute);
app.use('/servicio', servicioRoute);
app.use('/persona', personaRoute);
app.use('/inmueble', inmuebleRoute);
app.use('/photos', photoRoute);
app.use('/reserva', reservaRoute);
app.use('/inmuebleServicio', inmuebleServicioRoute);
app.use((err, res) => {
    if (err.message === 'Credenciales inválidas') {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
});
app.listen(port, () => {
    console.log(`App corriendo en: ${port}`);
});
