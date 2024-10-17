import { CrearBotonParams, Personaje } from "./personajes-listado.model";
import { obtenerPersonajes } from "./personajes-listado.api";

export let inputForm: string = "";
export const inputTextElement = document.getElementById("nombre");

export const crearElementoImagen = (
  portada: string,
  titulo: string
): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = portada;
  imagen.alt = titulo;
  return imagen;
};

export const crearElementoParrafo = (
  label: string,
  texto: string
): HTMLDivElement => {
  const div = document.createElement("div");

  const etiqueta = document.createElement("p");
  etiqueta.style.fontWeight = "bold";
  etiqueta.textContent = label;
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  div.appendChild(etiqueta);
  div.appendChild(parrafo);
  div.className = "parrafo";
  return div;
};

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

  const nombre = crearElementoParrafo("Nombre: ", `${personaje.nombre}`);
  elementoPersonaje.appendChild(nombre);
  const especialidad = crearElementoParrafo(
    "Especialidad: ",
    `${personaje.especialidad}`
  );
  elementoPersonaje.appendChild(especialidad);
  const habilidades = crearElementoParrafo(
    "Habilidades: ",
    `${personaje.habilidades.join(", ")}`
  );
  elementoPersonaje.appendChild(habilidades);

  return elementoPersonaje;
};

export const pintarPersonajes = async (str: string): Promise<void> => {
  const personajes = await obtenerPersonajes(str);
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

document.addEventListener("DOMContentLoaded", () => {
  handleClickFiltrar;
});

pintarPersonajes("");

export const obtenerValorCampo = (campo: string): string => {
  const elementoCampo = document.querySelector(`#${campo}`);
  if (elementoCampo && elementoCampo instanceof HTMLInputElement) {
    return elementoCampo.value;
  } else {
    throw new Error(`No se ha encontrado el campo ${campo}`);
  }
};

export const handleClickFiltrar = async (evento: Event) => {
  evento.preventDefault();
  inputForm = obtenerValorCampo("nombre");

  const div = document.getElementById("listado-personajes");
  if (div && div instanceof HTMLDivElement) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }
  if (inputTextElement && inputTextElement instanceof HTMLInputElement) {
    inputTextElement.value = "";
  }
  pintarPersonajes(inputForm);
};

const botonFiltrar = document.getElementById("botonFiltrar");
if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement)
  botonFiltrar.addEventListener("click", handleClickFiltrar);
