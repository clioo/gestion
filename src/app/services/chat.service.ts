import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats:Mensaje[]=[];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  constructor(private afs: AngularFirestore) {}

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(100));
    return this.itemsCollection.valueChanges();
  }


  agregarMensaje(texto:string){
    let mensaje:Mensaje = {
      nombre: 'chicho',
      mensaje:texto,
      fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);
  }
}
