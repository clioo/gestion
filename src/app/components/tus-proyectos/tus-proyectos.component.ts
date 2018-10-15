import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-tus-proyectos',
  templateUrl: './tus-proyectos.component.html',
  styleUrls: ['./tus-proyectos.component.css']
})
export class TusProyectosComponent implements OnInit {
  constructor() { }
  opened = true;
  tab = 1; //1=inbox 2=tarea 3=tuequipo 4=asignartarea 5=configuraciones
  ngOnInit() {
  }
  mode = new FormControl('push');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
