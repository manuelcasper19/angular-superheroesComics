import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailDisponibleService } from '../../validator/email-disponible.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VerificarDatosService } from 'src/app/shared/validator/verificar-datos.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
    
    .button{
      cursor: pointer;
    }
    `
  ]
})
export class RegisterComponent implements OnInit {

 
  getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formRegister )
  }

  constructor( private fb                 : FormBuilder,
               private emailServices      : EmailDisponibleService,
               private AuthService        : AuthService,
               private router             : Router,
               private vdatosServices     : VerificarDatosService) { }

  ngOnInit(): void {
  }
  formRegister: FormGroup = this.fb.group({
   email: ['', [ Validators.required, Validators.pattern(this.vdatosServices.emailPattern) ], [ this.emailServices ]],
   name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.vdatosServices.nombrePattern)]],
   lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.vdatosServices.nombrePattern)]],
   password: ['', [ Validators.required, Validators.minLength(6)]],
   password2: ['', [ Validators.required]]
  },
  {
    validators: this.vdatosServices.validarPasswordIguales( 'password', 'password2') 
  }
  )


  validarCampos( campo: string ){
    return this.vdatosServices.validarCampoCorrecto( campo, this.formRegister )
  }


  guardar(){
    
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      return;

    }
   
    const {email, password, name, lastname,   } = this.formRegister.value;
    this.AuthService.register(email, password, name, lastname )
        .subscribe( ok => {
          if(ok === true){
            this.router.navigateByUrl('/heroe')
          }else {
            Swal.fire('Error!', ok, 'error');
          }
        })

  }

}
