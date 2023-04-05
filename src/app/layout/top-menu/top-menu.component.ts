import { Component, OnInit } from '@angular/core';
import { LoginServicio } from 'src/app/login/servicios/login.servicio';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(private loginService: LoginServicio){
    
  }

  getLoginService(){
    return this.loginService;
  }
 
}
