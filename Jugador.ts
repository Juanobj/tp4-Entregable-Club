import { MiembroClub } from "./AbstractMiembroClub";

export enum Deporte {
  futbol = "Fútbol",
  basket = "Basket",
  zumba = "Zumba",
  voley = "Vóley",
  natacion = "Natación",
  gym = "Gym",
}

export class Jugador extends MiembroClub {
  deporte: Deporte;

  constructor(
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    documento: number,
    telefono: number,
    miembroDesde: string,
    deporte: Deporte
  ) {
    super(nombre, apellido, fechaNacimiento, documento, telefono, miembroDesde);
    this.deporte = deporte;
  }
}
