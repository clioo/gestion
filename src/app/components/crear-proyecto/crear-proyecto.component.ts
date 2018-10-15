import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  form:FormGroup;
  constructor() {
    this.form = new  FormGroup({
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    });
   }
  guardar(){
    console.log(this.form.value);
  }
  ngOnInit() {
  }

}
