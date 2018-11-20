import { Component, OnInit } from '@angular/core';

//providers
import { AuthService } from '../../services/auth.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users:any[]=[];
  constructor(private _authService:AuthService) {
    // afs.agregarDato({
    //   nombre:'chiho',
    //   apellido:'prueba2'
    // },'prueba1').then(()=>{
    //   console.log("todo al 100");
    // }).catch(err=>{
    //   console.log(err);
    // })
    // afs.obtenerDatos('prueba1').subscribe((data:any)=>{
    //   data.forEach(dato => {
    //     console.log(dato);
    //   });
    // })

  }
  iniciar(){
    if (this._authService.isAuthenticated()) {
      
    }else{  
      this._authService.login();
    }
  }
  ngOnInit() {
  }

}
