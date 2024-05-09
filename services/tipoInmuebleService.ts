import TipoInmueble from "../models/TipoInmueble";
import { tiposInmuebles } from "../utils";

let tiposInmueblesDummy = tiposInmuebles;

export default class TipoInmuebleService{

    static getAllTipoInmueble(): TipoInmueble[]{
        return tiposInmueblesDummy;
    }

    static getTipoInmuebleById(id: string): TipoInmueble[]{
        return tiposInmueblesDummy.filter(tipoIn => tipoIn.idTipoInmueble === parseInt(id));
    }

    static addTipoInmueble(tipoInmueble: TipoInmueble): TipoInmueble[]{
        tiposInmueblesDummy.push(tipoInmueble);
        return tiposInmueblesDummy;
    }

    static deleteTipoInmueble(id: string): TipoInmueble[]{
        tiposInmueblesDummy = tiposInmueblesDummy.filter(tipoIn => tipoIn.idTipoInmueble !== parseInt(id));
        return tiposInmueblesDummy;
    };

    static updateTipoInmueble(id: string, descripcion: string): TipoInmueble[]{
        let indexInmuebleSeleccionado = tiposInmueblesDummy.findIndex(tipoIn => tipoIn.idTipoInmueble == parseInt(id));
        tiposInmueblesDummy[indexInmuebleSeleccionado].descripcion = descripcion;
        return tiposInmueblesDummy;
    }
}