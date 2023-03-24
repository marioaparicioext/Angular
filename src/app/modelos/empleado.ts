import { Rol } from "./rol";

export interface Empleado{
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    contrasena: string;
    rol: Rol;
}