import axios from "axios";

import { Personaje } from "./personajes-listado.model";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};

export const obtenerPersonajes2 = async (str: string): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/personajes?nombre_like=${str}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};
// obtenerPersonajes2;

/*export const obtenerPersonajes = async () => {
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

obtenerPersonajes();*/
