import { TipoUsuario } from './TipoUsuario.enum'
import Localidad from './Localidad'

export default class Persona {
    id_usuario: Number
    nombre: String
    apellido: String
    email: String
    password: String
    tipo_usuario: TipoUsuario
    telefono: String
    domicilio: String
    localidad: Localidad

    constructor(
        nombre: String,
        apellido: String,
        email: String,
        password: String,
        tipo_usuario: TipoUsuario,
        telefono: String,
        domicilio: String,
        localidad: Localidad
    ) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.password = password
        this.tipo_usuario = tipo_usuario
        this.telefono = telefono
        this.domicilio = domicilio
        this.localidad = localidad
    }
}
