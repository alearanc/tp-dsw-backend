"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inmueble {
    constructor(id_inmueble, titulo_inmueble, descripcion_inmueble, precio_noche, direccion_inmueble, capacidad, tipo_inmueble, localidad) {
        this.id_inmueble = id_inmueble;
        this.titulo_inmueble = titulo_inmueble;
        this.descripcion_inmueble = descripcion_inmueble;
        this.precio_noche = precio_noche;
        this.direccion_inmueble = direccion_inmueble;
        this.capacidad = capacidad;
        this.tipo_inmueble = tipo_inmueble;
        this.localidad = localidad;
    }
}
exports.default = Inmueble;
