import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {
  empleadoId: number;
  constructor(private router: Router){
    if(localStorage != null){
      const id = localStorage.getItem("id");
      if(id != null){
        this.empleadoId = +id;
      }
    }  
  }
  ngOnInit(): void {
  
  }

  vacaciones(){
    this.router.navigate(['vacaciones/listar']);
  }

  roles(){
    this.router.navigate(['roles/listar']);
  }

  empleados(){
    this.router.navigate(['empleados/listar']);
  }
  
  verMisVacaciones(){
    this.router.navigate([`vacaciones/listar/${+localStorage.getItem('id')!}`]);
  }
}
