import { Component, OnInit } from '@angular/core';
import { Empleado } from './modelos/empleado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public empleados: Empleado[];

  constructor() { 

  }
  ngOnInit(): void {

  }

}
