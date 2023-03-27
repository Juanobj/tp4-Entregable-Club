import * as fs from "fs";
import * as readlineSync from "readline-sync";
import { Persona } from "./PersonaInterface";
import { Jugador, Deporte } from "./Jugador";

export class GestorClub {
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
      console.log("Operación cancelada");
      return;
    }
    const deporte: Deporte = Deporte[Object.keys(Deporte)[deporteIndex]] as Deporte;
    const nuevoSocio = new Jugador(nombre, apellido, fechaNacimiento, documento, telefono, miembroDesde, deporte);
    this.socios.push(nuevoSocio);
    this.escribirArchivo();
    console.log("Socio agregado correctamente");
  }
}
