export default class TipoInmueble {
    idTipoInmueble: number;
    descripcion: string;

    constructor(idTipoInmueble: number, descripcion:string){
        this.idTipoInmueble = idTipoInmueble;
        this.descripcion = descripcion;
    }
}