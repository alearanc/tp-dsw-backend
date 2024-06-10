export default class Localidad {
    codigoPostal: string;
    nombre: string;

    constructor(codigoPostal: string, nombre:string){
        this.codigoPostal = codigoPostal;
        this.nombre = nombre;
    }
}