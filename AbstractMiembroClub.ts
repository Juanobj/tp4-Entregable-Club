import { Persona } from "./PersonaInterface";

export abstract class MiembroClub implements Persona {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  documento: number;
  telefono: number;
  miembroDesde: string;

  constructor(
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    documento: number,
    telefono: number,
    miembroDesde: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.documento = documento;
    this.telefono = telefono;
    this.miembroDesde = miembroDesde;
  }
}
