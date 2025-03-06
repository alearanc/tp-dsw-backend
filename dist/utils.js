"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localidades = exports.tiposInmuebles = void 0;
const Localidad_1 = __importDefault(require("./models/Localidad"));
const TipoInmueble_1 = __importDefault(require("./models/TipoInmueble"));
exports.tiposInmuebles = [
    new TipoInmueble_1.default(1, "Hoteles"),
    new TipoInmueble_1.default(2, "Departamentos"),
    new TipoInmueble_1.default(3, "Habitaciones")
];
exports.localidades = [
    new Localidad_1.default(2000, "Rosario"),
    new Localidad_1.default(3000, "Santa Fe"),
    new Localidad_1.default(2240, "Coronda"),
    new Localidad_1.default(2252, "Galvez")
];
