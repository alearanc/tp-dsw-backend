export default class TipoInmueble {
    id_tipoinmueble: number;
    descripcion: string;

    constructor(id_tipoinmueble: number, descripcion:string){
        this.id_tipoinmueble = id_tipoinmueble;
        this.descripcion = descripcion;
    }
}