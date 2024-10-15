import { CrearBotonParams, Personaje } from "./personajes-listado.model";
import { obtenerPersonajes } from "./personajes-listado.api";

export const crearElementoImagen = (
  portada: string,
  titulo: string
): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = portada;
  imagen.alt = titulo;
  return imagen;
};

export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};
//// NO REVISADO

export const crearBoton = (
  crearBotonParams: CrearBotonParams
): HTMLButtonElement => {
  const { texto, id: peliculaId, nombreClase, onClick } = crearBotonParams;
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", () => {
    onClick(peliculaId);
  });
  boton.classList.add(nombreClase);
  return boton;
};

/*export const crearGrupoBotones = (id: string): HTMLDivElement => {
  const grupoBotones = document.createElement("div");
  grupoBotones.classList.add("grupo-botones");
  const botonEditar = crearBoton({
    texto: "Editar",
    id: id,
    nombreClase: "boton-editar",
    onClick: () => editaPelicula(id),
  });
  const botonBorrar = crearBoton({
    texto: "Borrar",
    id: id,
    nombreClase: "boton-borrar",
    onClick: () => borraPelicula(id),
  });
  grupoBotones.appendChild(botonEditar);
  grupoBotones.appendChild(botonBorrar);
  return grupoBotones;
};*/
//// Revisado

export const crearContenedorPersonaje = (
  personaje: Personaje
): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  const imagen = crearElementoImagen(
    `http://localhost:3000/${personaje.imagen}`,
    personaje.nombre
  );
  elementoPersonaje.appendChild(imagen);
  const nombre = crearElementoParrafo(personaje.nombre);
  elementoPersonaje.appendChild(nombre);
  const especialidad = crearElementoParrafo(personaje.especialidad);
  elementoPersonaje.appendChild(especialidad);
  const habilidades = crearElementoParrafo(personaje.habilidades.join(", "));
  elementoPersonaje.appendChild(habilidades);

  return elementoPersonaje;
};

export const pintarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes");
  if (listado && listado instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

document.addEventListener("DOMContentLoaded", pintarPersonajes);

/* export const editaPelicula = async (id: string) => {
  window.location.href = `../pelicula-editar/index.html?
  id=${encodeURIComponent(id)}`;
};
export const borraPelicula = async (id: string) => {
  try {
    await borrarPelicula(id);
    const listado = document.querySelector("#listado-peliculas");
    if (listado && listado instanceof HTMLDivElement) {
      listado.innerHTML = "";
      pintarPeliculas();
    } else {
      throw new Error("No se ha encontrado el contenedor del listado");
    }
    alert("Pelicula borrada con exito");
  } catch (error) {
    alert(error);
  }
};*/
