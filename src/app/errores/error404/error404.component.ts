import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component {
  constructor(private router: Router) {

  }

  //Dependiendo de que tengas la sesion activa el error 404 te redirige a un sitio u a otro
  public inicio() {
    if (localStorage.getItem("token") != null) {
      this.router.navigate(['/inicio']);
    } else {
      this.router.navigate(['/login']);
    }

  }
}
