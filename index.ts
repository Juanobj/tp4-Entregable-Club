import * as fs from "fs";
import * as readlineSync from "readline-sync";
import { Persona } from "./PersonaInterface";

abstract class MiembroClub implements Persona {
  constructor(
    public nombre: string,
    public apellido: string,
    public fechaNacimiento: string,
    public documento: number
  ) {
    this.telefono = 0;
    this.miembroDesde = "";
  }
  telefono: number;
  miembroDesde: string;

  abstract getDeporte(): string;
}

enum Deporte {
  FUTBOL,
  HOCKEY,
  TENIS,
  RUGBY,
}

class Jugador extends MiembroClub {
  constructor(
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    documento: number,
    public telefono: number,
    public miembroDesde: string,
    private _deporte: Deporte
  ) {
    super(nombre, apellido, fechaNacimiento, documento);
  }

  getDeporte(): string {
    return Deporte[this._deporte];
  }
}

class GestorClub {
  private socios: Jugador[];

  constructor() {
    this.socios = this.leerArchivo() || [];
  }

  private leerArchivo(): Jugador[] | null {
    try {
      const data = fs.readFileSync("socios.json", "utf-8");
      const socios = JSON.parse(data).map(
        (socio: any) =>
          new Jugador(
            socio.nombre,
            socio.apellido,
            socio.fechaNacimiento,
            socio.documento,
            socio.telefono,
            socio.miembroDesde,
            socio.deporte
          )
      );
      return socios;
    } catch (error) {
      console.log("No se encontró el archivo de socios");
      return null;
    }
  }

  private escribirArchivo(): void {
    try {
      fs.writeFileSync("socios.json", JSON.stringify(this.socios));
    } catch (error) {
      console.log("Error al guardar los socios");
    }
  }

  private obtenerDatoBusqueda(): string {
    const opciones = ["Nombre", "Deporte", "Documento", "Teléfono"];
    const index = readlineSync.keyInSelect(opciones, "¿Qué dato desea buscar?");
    if (index === -1) {
      console.log("Operación cancelada");
      process.exit();
    }
    const datoBusqueda = readlineSync.question(`Ingrese el ${opciones[index]} a buscar: `);
    return datoBusqueda;
  }

  public agregarSocio(): void {
    const nombre: string = readlineSync.question("Ingrese el nombre: ");
    const apellido: string = readlineSync.question("Ingrese el apellido: ");
    const fechaNacimiento: string = readlineSync.question("Ingrese la fecha de nacimiento: ");
    const documento: number = parseInt(readlineSync.question("Ingrese el número de documento: "));
    const telefono: number = parseInt(readlineSync.question("Ingrese el número de teléfono: "));
    const miembroDesde: string = readlineSync.question("Ingrese la fecha de alta del socio: ");
    const deporteIndex: number = readlineSync.keyInSelect(
      Object.keys(Deporte),
      "Seleccione el deporte:"
    );
    if (deporteIndex === -1) {
        console.log("Operación cancelada");}}}