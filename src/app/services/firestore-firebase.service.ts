import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class FirestoreFirebaseService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private angularFireStorageReference:AngularFireStorageReference;
  private angularFireUploadTask:AngularFireUploadTask;
  private prueba = new Array();
  
  constructor(private afs: AngularFirestore, private _afStorage:AngularFireStorage) { 
    // this.itemsCollection = afs.collection('proyectos');
    // this.itemsCollection.snapshotChanges()
    // .pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, data };
    //   }))).subscribe(data=>{
    //     data.forEach(dato => {
    //       this.itemsCollection = afs.collection('proyectos').doc(dato.id)
    //       .collection('roles', ref => ref.where('usuario', '==','facebook|2478787485496082' ));
    //       this.itemsCollection.valueChanges().subscribe(data=>{
    //         this.prueba.push({
    //           id:dato.id,
    //           titulo:dato.data.titulo
    //         })
    //       });
    //     });
    //     console.log(this.prueba)
    //   })
    }



    
  //valuechanges obtiene los datos a la vista, bueno para mostrar en html
  obtenerDatosValueChanges(coleccion:string){
    return this.afs.collection<any>(coleccion).valueChanges();
  }
 
  agregarDato(datos:any, coleccion:string){
    this.itemsCollection = this.afs.collection<any>(coleccion);
    datos.id = this.afs.createId();
    return this.itemsCollection.add(datos);
  }
  getById(id:string, coleccion:string){
    this.itemsCollection = this.afs.collection(coleccion);
    return this.itemsCollection.doc(id).valueChanges();
  }








  subirArchivo(event, idProyecto, idRol, idTarea){
    const file = event.target.files[0];
    const filePath = idProyecto + '-' + idRol + '-' + idTarea + '.zip';
    const fileRef = this._afStorage.ref(filePath);
    const task = this._afStorage.upload(filePath, file);
    let uploadPercent: Observable<number> =  task.percentageChanges();
    let objeto = {
      porcentaje:uploadPercent,
      linkDescarga:fileRef.getDownloadURL()
    };
    return objeto;

  
  }









  obtenerRolUsuario(idProyecto:string,usuario:string){
    let rol:any;
    this.itemsCollection = this.afs.collection('proyectos').doc(idProyecto).collection('roles', ref => ref.where('usuario', '==',usuario))
    return this.itemsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })))
  }
  obtenerTareasDeRol(idProyecto:string,idRol:string){
    this.itemsCollection = this.afs.collection('proyectos').doc(idProyecto).collection('roles')
    .doc(idRol).collection('tarea');
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { data };
      })))

  }
  obtenerTareaSingular(idProyecto,idRol,idTarea){
    this.itemsCollection = this.afs.collection('proyectos').doc(idProyecto).collection('roles').doc(idRol)
    .collection('tarea');
    return this.itemsCollection.doc(idTarea).valueChanges();
  }
  agregarRolProyecto(datos:any[],idProyecto:string){
    this.itemsCollection = this.afs.collection('proyectos').doc(idProyecto).collection('roles');

    datos.forEach(dato => {
      this.itemsCollection.add(dato).then(()=>{
        console.log('si jala');
      });
    });

    // datos.forEach(dato => {
    //   dato.id = this.afs.createId();
    //   this.itemsCollection.doc(idProyecto).collection('roles').add(dato).then(()=>{
    //     console.log('si jala')
    //   }).catch((err)=>console.log(err))
    // });
  }
  obtenerColeccionDeDocumento(nombreColeccion:string,idDocumento:string, nombreColeccionDocumento){
    this.itemsCollection = this.afs.collection<any>(nombreColeccion).doc(idDocumento).collection(nombreColeccionDocumento);
    return this.itemsCollection.snapshotChanges();
  }
  updateDocumentoEnColeccionDeProyecto(idDocumento:string,nombreColeccionDocumento:string,idDocumentoEnColeccion:string,data:any){
    this.itemsCollection = this.afs.collection<any>('proyectos').doc(idDocumento).collection(nombreColeccionDocumento);

    return this.itemsCollection.doc(idDocumentoEnColeccion).update(data);

  }
  updateEstadoDeTarea(idProyecto,idRol,idTarea,data:any){
    this.itemsCollection = this.afs.collection<any>('proyectos').doc(idProyecto).collection('roles').doc(idRol).collection('tarea');
    return this.itemsCollection.doc(idTarea).update(data);
  }
  asignarTarea(idProyecto:string,idRol:string,data:any){
    this.itemsCollection = this.afs.collection('proyectos').doc(idProyecto).collection('roles')
    .doc(idRol).collection('tarea');
    return this.itemsCollection.add(data);
  }
 

 

}
