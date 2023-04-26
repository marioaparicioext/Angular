import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.css']
})
export class FooterMenuComponent {

  constructor(private router: Router){

  }
  public inicio(){
    if(localStorage.getItem("token")){
      this.router.navigate(['/inicio']);
    }else{
      this.router.navigate(['/login']);
    }
    
  }
}
