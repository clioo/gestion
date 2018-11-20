import { Component, OnInit, AfterContentChecked, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import {FormControl} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { FirestoreFirebaseService } from '../../services/firestore-firebase.service';

import { map } from 'rxjs/operators';
import { InboxComponent } from './inbox/inbox.component';




@Component({
  selector: 'app-tus-proyectos',
  templateUrl: './tus-proyectos.component.html',
  styleUrls: ['./tus-proyectos.component.css']
})
export class TusProyectosComponent implements OnInit {
  @ViewChild('selectProyectos') selectProyectos:ElementRef;
  profile:any;
  //*************PROYECTOS****************************** 
  @Input() proyectoEscogido:string = '0';
  proyectosCargados = true;
  proyectosUsuario:any;
  proyectos:any;
  @Input() idUsuarioAdmin:string;
  cambiarTipo(value:any){
    this.router.navigateByUrl('/tus-proyectos', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/tus-proyectos', value])); 
  }
  //****************************************************



  private itemsCollection:AngularFirestoreCollection;
  constructor(private activatedRoute:ActivatedRoute, private router:Router ,private afs:AngularFirestore,private _authService:AuthService, private _fsService:FirestoreFirebaseService) { 


    
  }
  opened = true;
  tab = 0; //1=inbox 2=tarea 3=tuequipo 4=asignartarea 5=configuraciones
  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
      this.cargarProyectos();
      } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
        this.cargarProyectos();
      });
    }

    



  

    
}

cargarProyectos(){
  this.afs.collection('proyectos', ref => ref.where('usuario', '==',this.profile.sub ))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        }))).subscribe(data => {
          this.proyectos = data;
          this.proyectosCargados = false;
          setTimeout(() => {
            this.activatedRoute.params.subscribe(params=>{
              if (typeof params['idProyecto'] === 'undefined') {
                this.proyectoEscogido = '0';
                this.selectProyectos.nativeElement.value = '0';
              }else{
                this.proyectoEscogido = String(params['idProyecto']);
                this.selectProyectos.nativeElement.value = String(params['idProyecto'])
                
                this._fsService.obtenerColeccionDeDocumento('proyectos',this.proyectoEscogido,'roles').subscribe(data=>{
                  data.forEach(dato => {
                    if (dato.nombre == 'Administrador') {
                      this.idUsuarioAdmin = String(dato.usuario);
                    }
                  });
                })  

              }
            })
          }, 30);
        });
}



  mode = new FormControl('push');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
