import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicio } from '../servicios/login.servicio';
import { Credenciales } from 'src/app/modelos/credenciales';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credenciales: Credenciales = {
    email: '',
    password: ''
  };


  constructor(private router: Router, private loginService: LoginServicio) {

  }

  //Se logea el usuario mediante las credenciales requeridas
  public loginSubmit(form: NgForm) {
    console.log("FORM VALUE", form.value);
    this.loginService.login(this.credenciales).subscribe(response => {
      this.router.navigate([`/inicio`]);

    }, (error => {
      alert("Credenciales no validas");

    }));



  }



}
