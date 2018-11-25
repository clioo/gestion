import { Component, OnInit, Inject } from '@angular/core';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tu-equipo',
  templateUrl: './tu-equipo.component.html',
  styleUrls: ['./tu-equipo.component.css']
})
export class TuEquipoComponent implements OnInit {
  roles:any[] = [];
  usuarios: Observable<any[]>;
  rolUsuario:any;
  constructor(public dialog: MatDialog,private af:RealtimeFirebaseService, _afs:FirestoreFirebaseService, @Inject(TusProyectosComponent) public app:TusProyectosComponent) { 
    _afs.obtenerRolUsuario(app.proyectoEscogido, app.profile.sub)
    .subscribe(data=>{
      this.rolUsuario = data;
      console.log(data)
    })


    _afs.obtenerColeccionDeDocumento('proyectos', app.proyectoEscogido, 'roles').pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })))
    .subscribe(data=>{
      let roles:any[] = [];
      this.roles = data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].data.usuario != '') {
          roles.push(data[i])
        }
        this.roles = roles;
      }
    })
    af.getUsuarios().subscribe((data:any)=>this.usuarios = data);

    }
    modalAsignarTarea(idRol:any){
      const dialogRef = this.dialog.open(AsignarTareaModal,{
        data:{
          idProyecto:this.app.proyectoEscogido,
          idRol:idRol
        }
      })
     }
  ngOnInit() {
  }

}




@Component({
  selector: 'asignar-tarea-modal',
  templateUrl: 'asignar-tarea-modal.html',
})
export class AsignarTareaModal {

  constructor(
    public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(fechaInicial:string,fechaLimite:string,titulo:string,descripcion:string): void {
    console.log(fechaInicial,fechaLimite,titulo,descripcion)
    let objeto:any = {
      title:titulo,
      idRol: this.data.idRol,
      descripcion:descripcion,
      estado:'c', //a = terminado, b=en curso, c= sin empezar
      start:fechaInicial,
      end:fechaLimite
    }
    this._afs.asignarTarea(this.data.idProyecto,this.data.idRol,objeto);
  }

}
