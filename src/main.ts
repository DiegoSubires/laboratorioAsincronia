import { Personaje } from "./personajes-listado.model";
export const personajesPromesa = fetch("http://localhost:3000/personajes");

personajesPromesa
  .then((respuesta) => respuesta.json())
  .then((datos: Personaje) => console.log(datos));
