import Localidad from "../models/Localidad";
import { TipoUsuario } from "../models/TipoUsuario.enum";

export interface IPersona {
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    tipo_usuario: TipoUsuario;
    telefono: string;
    domicilio: string;
    localidad: Localidad
}