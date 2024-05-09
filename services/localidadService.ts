import Localidad from "../models/Localidad";
import { localidades } from "../utils";

let localidadesDummy = localidades;

export default class LocalidadService{

    static getAllLocalidades(): Localidad[]{
        return localidadesDummy;
    }

    static getLocalidadByCodigoPostal(id: string): Localidad[]{
        return localidadesDummy.filter(tipoIn => tipoIn.codigoPostal === parseInt(id));
    }

    static addLocalidad(localidad: Localidad): Localidad[]{
        localidadesDummy.push(localidad);
        return localidadesDummy;
    }

    static deleteLocalidad(codigoPostal: string): Localidad[]{
        localidadesDummy = localidadesDummy.filter(tipoIn => tipoIn.codigoPostal !== parseInt(codigoPostal));
        return localidadesDummy;
    };

    static updateLocalidad(codigoPostal: string, descripcion: string): Localidad[]{
        let indexInmuebleSeleccionado = localidadesDummy.findIndex(tipoIn => tipoIn.codigoPostal == parseInt(codigoPostal));
        localidadesDummy[indexInmuebleSeleccionado].nombre = descripcion;
        return localidadesDummy;
    }
}