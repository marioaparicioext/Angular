import { Component, OnInit } from '@angular/core';
import { LoginServicio } from 'src/app/login/servicios/login.servicio';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit{
  constructor(private loginService: LoginServicio){
    
  }
  ngOnInit(): void {
    
  }

  //Getter del servicio de login
  getLoginService(){
    return this.loginService;
  }

  
 
}
