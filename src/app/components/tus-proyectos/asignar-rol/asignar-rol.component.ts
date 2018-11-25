import { Component, OnInit, Inject } from '@angular/core';
import { TusProyectosComponent } from '../tus-proyectos.component';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreFirebaseService } from '../../../services/firestore-firebase.service';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';


export interface DialogData {
  idProyecto: string;
  idRol: string;
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

  expulsarUsuario(idRol:any){
    this._afs.updateDocumentoEnColeccionDeProyecto(
      this.app.proyectoEscogido, 'roles', idRol,
      {
        usuario:''
      }
    ).then(data=>{
      // this.router.navigate(['/tus-proyectos'])
    }).catch(err=>console.log(err));
  }

  constructor(private _fbService:RealtimeFirebaseService, public dialog: MatDialog,private _afs:FirestoreFirebaseService, @Inject(TusProyectosComponent) public app:TusProyectosComponent) {
    
    

    _afs.obtenerColeccionDeDocumento('proyectos',app.proyectoEscogido,'roles').pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      }))).subscribe(data=>{
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

   modalAgregarRol(idRol:any){
    const dialogRef = this.dialog.open(AgregarRolModal,{
      data:{
        idProyecto:this.app.proyectoEscogido
      }
    })
   }

  modalAsignarRol(idRol:any): void {
    const dialogRef = this.dialog.open(AsignarRolModal, {
      data: {idRol: idRol, idProyecto: this.app.proyectoEscogido}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
  ngOnInit() {
    }

}


@Component({
  selector: 'asignar-rol-modal',
  templateUrl: 'asignar-tarea-modal.html',
})
export class AsignarRolModal {

  constructor(
    public dialogRef: MatDialogRef<AsignarRolModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'agregar-rol-modal',
  templateUrl: 'agregar-rol-modal.html',
})
export class AgregarRolModal {

  constructor(
    public dialogRef: MatDialogRef<any>, private _afs:FirestoreFirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(nombreRol:string): void {
    let arreglo:any[] = [];
    arreglo.push({
      nombre:nombreRol,
      usuario:''
    })

    if (nombreRol) {
      this._afs.agregarRolProyecto(arreglo , this.data.idProyecto);  
    }
    
  }

}