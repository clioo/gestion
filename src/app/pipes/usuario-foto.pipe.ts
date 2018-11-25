import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioFoto'
})
export class UsuarioFotoPipe implements PipeTransform {

  transform(value: any, usuarios:any[]): any {
    if (value) {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].identity.user_id == value) {
          return usuarios[i].identity.picture; 
        }
      }

     }else{
    return 'Sin asignar';
  }
  }

}
