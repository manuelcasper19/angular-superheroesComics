import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VerificarDatosService {

//   constructor() { }


//   //Verificar que fecha no se mayor a la actual
// verificarFechas(fechaIngresada: string){
//   const fechaActual = new Date();

//   return (formGroup : AbstractControl): ValidationErrors | null => {
//     const fecha = formGroup.get(fechaIngresada)?.value;
    
//     const fechaCapturada = new Date(fecha)
    
//     if(fechaCapturada.getTime() >= fechaActual.getTime()){
//       formGroup.get(fechaIngresada)?.setErrors( { fechaesMayor: true });
//       return { fechaesMayor: true }

//     }
//     return null

//   }

// }

// validarPasswordIguales( campo1 : string, campo2: string){
//   return ( formGroup : AbstractControl ): ValidationErrors | null => {
//     const password1 = formGroup.get(campo1)?.value;
//     const password2 = formGroup.get(campo2)?.value;

//     if( password1 !== password2 ){
//       formGroup.get(campo2)?.setErrors( { noiguales: true });

//       return { noIguales: true }
//     }
//     //formGroup.get(campo2)?.setErrors( null );
//     return null;
//   }

// }

}
