import Localidad from "./models/Localidad";
import TipoInmueble from "./models/TipoInmueble";

export let tiposInmuebles: TipoInmueble[] = [
    new TipoInmueble(1, "Hoteles"),
    new TipoInmueble(2, "Departamentos"),
    new TipoInmueble(3, "Habitaciones")
];

export let localidades: Localidad[] = [
    new Localidad("2000", "Rosario"),
    new Localidad("3000", "Santa Fe"),
    new Localidad("2240", "Coronda"),
    new Localidad("2252", "Galvez")
];