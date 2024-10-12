export default class InmuebleServicio {
  id_inmueble: number;
  id_servicio: number;

  constructor(idInmueble: number, idServicio: number){
      this.id_inmueble= idInmueble;
      this.id_servicio= idServicio;
  }
}