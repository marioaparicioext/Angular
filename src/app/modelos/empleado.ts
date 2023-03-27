import { Rol } from "./rol";

export class Empleado{
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    contrasena: string;
    rol: Rol;
}