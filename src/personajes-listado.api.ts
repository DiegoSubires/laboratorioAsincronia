/*import axios from "axios";

import { Personaje } from "./personajes-listado.model";
export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};

obtenerPersonajes();*/

export const obtenerPersonajes = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/personajes");
    if (!respuesta.ok) {
      throw new Error("No se pudo conectar con el servidor");
    }
    const datos = await respuesta.json();
    return datos;
  } catch {
    (error: any) => console.log("Error: ", error);
  }
};

obtenerPersonajes();
