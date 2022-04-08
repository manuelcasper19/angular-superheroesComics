import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VerificarDatosService {

  public emailPattern          :   string   =  "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public nombrePattern         :   string   = '([Aa-zA-ZáéíóúÁÉÍÓÚÑñ ]{2,}\s?){2,4}$';
  public userPattern           :   string   = '^[a-zA-Z0-9\_\-]{4,16}$';

  constructor() { }

  getErrorMsg( campo : string, formLogin : FormGroup ): string{
    const errors = formLogin.get( campo )?.errors;

    if(errors?.['required']){

        if(errors?.['required'] && campo === 'peliculas'){

          return `Las ${ campo } son necesarias`;

        }else {

          return `El ${ campo } es requerido`;

        }
     
      
    }else if(errors?.['minlength']){

        if( campo === 'name' || campo === 'lastname'){     

          return `La el ${ campo } debe tener 3 o mas caracteres `

        }else if(errors?.['minlength'] && campo === 'password'){
        
          return 'La contraseña debe tener 6 o mas caracteres'

        }

    }else if (errors?.['pattern']){
     
         return `El valor ingresado no tiene formato de ${ campo }`

    }else if(errors?.['fechaesMayor'] ){
     
         return 'La fecha de publicación no puede ser mayor a la actual'

    }else if(errors?.['emailTomado'] ){
     
         return 'El email no está disponible, intente con otro correo'

    }
    
    if(errors?.['noIguales'] ){
      
      return 'Las contraseñas no son iguales'
    }
   
    return '';
  }

  validarCampoCorrecto( campo : string, form: FormGroup ): boolean {
    
    return form.get(campo)?.invalid
           && form.get(campo)?.touched || false;          
          
  }

  verificarFechas(fechaIngresada: string){
    const fechaActual = new Date();
  
    return (formGroup : AbstractControl): ValidationErrors | null => {
      const fecha = formGroup.get(fechaIngresada)?.value;
      
      const fechaCapturada = new Date(fecha)
      
      if(fechaCapturada.getTime() >= fechaActual.getTime()){
        formGroup.get(fechaIngresada)?.setErrors( { fechaesMayor: true });
        return { fechaesMayor: true }
  
      }
      return null
  
    }
  
  }

  validarPasswordIguales( campo1 : string, campo2: string){
    return ( formGroup : AbstractControl ): ValidationErrors | null => {
      const password1 = formGroup.get(campo1)?.value;
      const password2 = formGroup.get(campo2)?.value;
    
      
      if( password1 !== password2 ){

        formGroup.get(campo2)?.setErrors( { noiguales: true });        

        return { noIguales: true }
      } if( password1 === password2 && formGroup.touched ){
        formGroup.get(campo2)?.setErrors( null );

      }       
      return null;
    }

  }
}
