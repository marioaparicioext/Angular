import { Empleado } from "./empleado";

export class Vacaciones{
    id: number;
    empleado: Empleado;
    fechaSolicitud: Date;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
}