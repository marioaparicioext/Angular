import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {
  empleadoId: number;
  constructor(private router: Router) {
    this.empleadoId = +localStorage.getItem("id")!;
  }
  ngOnInit(): void {

  }

  //Navega a la lista de vacaciones
  vacaciones() {
    this.router.navigate(['vacaciones/listar']);
  }

  //Navega a la lista de roles
  roles() {
    this.router.navigate(['roles/listar']);
  }

  //Navega a la lista de empleados
  empleados() {
    this.router.navigate(['empleados/listar']);
  }

  //Navega a la lista de las vacaciones del empleado actual
  verMisVacaciones() {
    this.router.navigate([`vacaciones/listar/${this.empleadoId}`]);
  }
}
