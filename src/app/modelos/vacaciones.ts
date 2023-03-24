import { Empleado } from "./empleado";

export interface Vacaciones{
    id: number;
    empleado: Empleado;
    fechaSolicitud: Date;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
}