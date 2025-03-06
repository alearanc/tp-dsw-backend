import Localidad from './Localidad';
import Persona from './Persona';
import TipoInmueble from './TipoInmueble';

export default class Inmueble {
    id_inmueble: number
    titulo_inmueble: string
    descripcion_inmueble: string
    precio_noche: number
    direccion_inmueble: string
    capacidad: number
    tipo_inmueble: TipoInmueble
    localidad: Localidad
    propietario!: Persona
    habilitado!: Boolean

    constructor(
        id_inmueble: number,
        titulo_inmueble: string,
        descripcion_inmueble: string,
        precio_noche: number,
        direccion_inmueble: string,
        capacidad: number,
        tipo_inmueble: TipoInmueble,
        localidad: Localidad
    ) {
        this.id_inmueble = id_inmueble
        this.titulo_inmueble = titulo_inmueble
        this.descripcion_inmueble = descripcion_inmueble
        this.precio_noche = precio_noche
        this.direccion_inmueble = direccion_inmueble
        this.capacidad = capacidad
        this.tipo_inmueble = tipo_inmueble
        this.localidad = localidad
    }
}
