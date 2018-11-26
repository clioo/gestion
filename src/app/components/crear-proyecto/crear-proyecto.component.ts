import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  form:any;
  guardado:boolean = false;
  titulo:any;
  descripcion:any;
  profile:any;
  rol:string = '';
  roles:any[] = [];
  constructor(private afs:FirestoreFirebaseService, private _authService:AuthService, private router:Router) {
    this.form = new  FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    });
   }
  agregarRol(rol:string){
    let objeto = {
      nombre: rol,
      usuario: ''
    }
    this.roles.push(objeto);
    this.rol = '';
  }
  eliminarRol(idRol:number){
    this.roles.splice(idRol,1);
  }
  guardar(){


    var objeto:any = this.form.value;
    objeto.usuario = this.profile.sub;
    objeto.fecha= new Date().getTime();
    console.log(this.form);
    if (this.form.valid) {
      
      //variable para el app-loading 
      this.guardado = true;
      
      //crea los proyectos y agrega los roles
      this.afs.agregarDato(objeto,'proyectos').then((data)=>{
        console.log(data.id)
        let objeto = {
          nombre:'Administrador',
          usuario:this.profile.sub
        }
        this.roles.push(objeto);
        this.roles.push()
        this.afs.agregarRolProyecto(this.roles,data.id);
        this.router.navigate(['tus-proyectos']);
        // this.afs.obtenerDatos('proyectos').subscribe(data=>{
        //   // console.log(data[data.length - 1]);
        // })
      });  
    }
    
    
  }
  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
    } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
