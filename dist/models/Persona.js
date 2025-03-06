"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Persona {
    constructor(id_usuario, nombre, apellido, email, password, tipo_usuario, telefono, domicilio, isAdmin) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.tipo_usuario = tipo_usuario;
        this.telefono = telefono;
        this.domicilio = domicilio;
        this.isAdmin = isAdmin;
    }
}
exports.default = Persona;
