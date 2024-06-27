import { TipoUsuario } from './TipoUsuario.enum';
import Localidad from './Localidad';

export default class Persona {
    constructor(
        public id_usuario: number,
        public nombre: string,
        public apellido: string,
        public email: string,
        public password: string,
        public tipo_usuario: TipoUsuario,
        public telefono: string,
        public domicilio: string,
        public localidad: Localidad,
    ) {}
}
