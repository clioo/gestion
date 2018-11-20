import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
}) 
export class FirestoreFirebaseService {
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) { }
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
    return this.itemsCollection.valueChanges();
  }
}
