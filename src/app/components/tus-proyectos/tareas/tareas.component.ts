import { Component, OnInit, ViewChild, Inject  } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options} from 'fullcalendar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as $ from 'jquery';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) { }
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  calendarOptions: Options;
  ngOnInit() {

    $('#calendar').fullCalendar({
      events: [
        {
          title: 'Event Title1',
          start: '2018-03-17T13:13:55.008',
          end: '2018-03-19T13:13:55.008'
        },
        {
          title: 'Event Title2',
          start: '2018-03-17T13:13:55-0400',
          end: '2018-03-19T13:13:55-0400'
        }
      ],
      defaultView:"agendaWeek",
       editable: true,
       eventLimit: false,
       header: {
         left: 'prev,next today',
         center: 'title',
         right: 'month,agendaWeek,agendaDay,listMonth'
       },
      eventClick: function(calEvent, jsEvent, view) {
    
        alert('Event: ' + calEvent.title);
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        alert('View: ' + view.name);
        this.openDialog();
    
    
      }
    });

  
 
  }

  //abrir modal
  openDialog(id="raul"): void {
    const dialogRef = this.dialog.open(TareasModal, {
      width: 'width:30%;',
      height:'height:30%;',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

export class TareasModal {

  constructor(
    public dialogRef: MatDialogRef<TareasModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
