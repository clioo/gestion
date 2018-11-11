import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-asignar-tarea',
  templateUrl: './asignar-tarea.component.html',
  styleUrls: ['./asignar-tarea.component.css']
})
export class AsignarTareaComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) { }
  openDialog(nombre="raul"): void {
    const dialogRef = this.dialog.open(AsignarTareaModal, {
      width: 'width:30%;',
      height:'height:30%;',
      data: {name: this.name, animal: this.animal}
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