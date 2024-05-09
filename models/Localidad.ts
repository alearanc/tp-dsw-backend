export default class Localidad {
    codigoPostal: number;
    nombre: string;

    constructor(codigoPostal: number, nombre:string){
        this.codigoPostal = codigoPostal;
        this.nombre = nombre;
    }
}