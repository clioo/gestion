import { Component, OnInit } from '@angular/core';
//providers
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _authService:AuthService) { }
  iniciar(){
    if (this._authService.isAuthenticated()) {
      
    }else{  
      this._authService.login();
    }
  }
  ngOnInit() {
  }

}
