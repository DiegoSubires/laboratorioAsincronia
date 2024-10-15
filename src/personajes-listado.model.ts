export interface Personaje {
  id: string;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

///
export interface CrearBotonParams {
  texto: string;
  id: string;
  nombreClase: string;
  onClick: (id: string) => void;
}
