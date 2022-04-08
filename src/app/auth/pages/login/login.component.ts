import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { VerificarDatosService } from 'src/app/shared/validator/verificar-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    
    .button{
      cursor: pointer;
    }
    `
  ]
})
export class LoginComponent implements OnInit {
  
  getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formlogin )
  }

  constructor( private fb                 : FormBuilder,               
               private authServices       : AuthService,
               private router             : Router,
               private vdatosServices     : VerificarDatosService ) { }

  ngOnInit(): void {
 
  }
  formlogin : FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern(this.vdatosServices.emailPattern) ]],
    password: ['', [ Validators.required ]]

  }) 


  validarCampos( campo : string ): boolean {            
     return this.vdatosServices.validarCampoCorrecto( campo, this.formlogin)          
  }

  login(){
  
    if(this.formlogin.invalid){
      this.formlogin.markAllAsTouched();
      return;

    }

   
    const { email, password } = this.formlogin.value;

    this.authServices.login( email, password)
        .subscribe( ok => {
          if(ok === true){
            this.router.navigateByUrl('/heroe')
          } else {
            Swal.fire('Error!', ok, 'error')
          }
        } )
    
  }


}
