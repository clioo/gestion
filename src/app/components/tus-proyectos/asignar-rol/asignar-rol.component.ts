import { Component, OnInit, Inject } from '@angular/core';
import { TusProyectosComponent } from '../tus-proyectos.component';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.css']
})
export class AsignarRolComponent implements OnInit {
  animal: string;
  name: string;
  roles:any;
  usuarios:any;
  idUsuario:string;
  idAdmin:string;
  rolesCargados:boolean = false;
  constructor(private _fbService:RealtimeFirebaseService, public dialog: MatDialog,_afs:FirestoreFirebaseService, @Inject(TusProyectosComponent) public app:TusProyectosComponent) {
    
    _afs.obtenerColeccionDeDocumento('proyectos',app.proyectoEscogido,'roles').subscribe(data=>{
      this.idUsuario = app.profile.sub;
      this.idAdmin  = app.idUsuarioAdmin;
      this.roles = data;
      setTimeout(() => {
        _fbService.getUsuarios().subscribe(data=>{
          this.usuarios = data;
          this.rolesCargados = true;

        })
      }, 50);
      
      })

   }
  openDialog(nombre="raul"): void {
    const dialogRef = this.dialog.open(AsignarTareaModal, {
      width: '70%',
      height:'60%',
      data: {name: nombre, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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
    public dialogRef: MatDialogRef<AsignarTareaModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}