import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class FirestoreFirebaseService {
  private itemsCollection: AngularFirestoreCollection<any>;

  private prueba = new Array();

  constructor(private afs: AngularFirestore) { 
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

  obtenerProyectosDeUsuario(){

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
}
