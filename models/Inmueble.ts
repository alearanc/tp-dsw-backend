import TipoInmueble from './TipoInmueble';
import Localidad from './Localidad';
import Persona from './Persona';

export default class Inmueble {
    id_inmueble: number
    titulo_inmueble: string
    descripcion_inmueble: string
    precio_noche: number
    direccion_inmueble: string
    capacidad: number
    tipoinmueble: TipoInmueble
    localidad: Localidad
    propietario: Persona

    constructor(
        id_inmueble: number,
        titulo_inmueble: string,
        descripcion_inmueble: string,
        precio_noche: number,
        direccion_inmueble: string,
        capacidad: number,
        tipoinmueble: TipoInmueble,
        localidad: Localidad
    ) {
        this.id_inmueble = id_inmueble
        this.titulo_inmueble = titulo_inmueble
        this.descripcion_inmueble = descripcion_inmueble
        this.precio_noche = precio_noche
        this.direccion_inmueble = direccion_inmueble
        this.capacidad = capacidad
        this.tipoinmueble = tipoinmueble
        this.localidad = localidad
    }
}
