import { Component, OnInit } from '@angular/core';
import { RealtimeFirebaseService } from '../../../services/realtime-firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tu-equipo',
  templateUrl: './tu-equipo.component.html',
  styleUrls: ['./tu-equipo.component.css']
})
export class TuEquipoComponent implements OnInit {
  usuarios: Observable<any[]>;
  constructor(private af:RealtimeFirebaseService) { 
    af.getUsuarios().subscribe((data:any)=>this.usuarios = data);
    }

  ngOnInit() {
  }

}
