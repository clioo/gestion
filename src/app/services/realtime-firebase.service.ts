import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RealtimeFirebaseService {
  private usuarios: Observable<any[]>;
  constructor(private af:AngularFireDatabase) {   }
   getUsuarios(){
    return this.af.list('users').valueChanges();
   }

  }
