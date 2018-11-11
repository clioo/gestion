import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  mensaje = "";
  elemento:any;
  enviarMensaje(){
    console.log(this.mensaje);
    if(this.mensaje == ""){
      return;
    }else{
      this._chatservice.agregarMensaje(this.mensaje).then(()=>{
        this.mensaje ="";
      })
      .catch(err=>{
        alert(err);
      })
    }
  }
  constructor(public _chatservice:ChatService) {
  
    _chatservice.cargarMensajes().subscribe((mensajes:any[])=>{{
      _chatservice.chats = [];
      for(let mensaje of mensajes){
        _chatservice.chats.unshift(mensaje);
      }
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    }});

   }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

}
