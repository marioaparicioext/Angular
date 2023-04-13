import { Component } from '@angular/core';
import { EmpleadoServicio } from '../servicios/empleado.servicio';
import { RolServicio } from 'src/app/rol/servicios/rol.servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Empleado } from 'src/app/modelos/empleado';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  idUser: number
  empleado: Empleado
  newPwd: string
  private apiServeUrl = 'http://localhost:8080';
  constructor(private empleadoServicio: EmpleadoServicio,
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.idUser = +localStorage.getItem('id')!;
    this.cargarDatos(this.idUser);
    this.newPwd = "";
  }

  public cargarDatos(idUser: number): void {
    this.empleadoServicio.obtenerEmpleadoPorId(idUser).subscribe((response: Empleado) => {
      this.empleado = response;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }
  public editarEmpleado(): void {
    const idRuta = localStorage.getItem('id')!;
    if(this.newPwd != ""){
      console.log("entrando a editarPerfil");
      this.empleado.contrasena = this.newPwd;
      this.empleadoServicio.editarPerfil(this.empleado).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }else{
      console.log("entrando a modificarEmpleado");
      this.empleadoServicio.modificarEmpleado(this.empleado).subscribe(
        () => {
          this.router.navigate(['/inicio']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } 
  
  }
    
   
}


