import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/auth/interface/auth.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(user : User): string{
     if(!user.img){
       return 'assets/no-image.png'  ;
     }else {
      return user.img 
     }
     
  }

}
