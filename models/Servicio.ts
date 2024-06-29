export default class Servicio {
    id_servicio: number;
    descripcion_servicio: string;

    constructor(id_servicio: number, descripcion_servicio:string){
        this.id_servicio = id_servicio;
        this.descripcion_servicio = descripcion_servicio;
    }
}
