import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {



  transform(value: any, usuarios:any[]): any {
    if (value) {
      console.log(usuarios.find(value));
        usuarios.forEach(usuario => {
          if (usuario.identity.user_id == value) {
            console.log(usuario.identity.name);
            return 'sadsad'; 
          }
        });
       }else{
      return 'Sin asignar';
    }
    
  }

}
