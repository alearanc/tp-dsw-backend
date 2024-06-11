export default class Localidad {
    cod_postal: string;
    nombre: string;

    constructor(cod_postal: string, nombre:string){
        this.cod_postal = cod_postal;
        this.nombre = nombre;
    }
}