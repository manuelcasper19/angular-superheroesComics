import { Component,  OnInit,  } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbardService } from '../../services/snackbard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VerificarImagenService } from '../../../shared/validator/verificar-imagen.service';
import { Options, ImageResult } from 'ngx-image2dataurl';
import { VerificarDatosService } from 'src/app/shared/validator/verificar-datos.service';




@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styles: [
    `
    mat-form-field {
      
      width: 100%;     
      justify-content: center;
      align-items: center;
    }

    .matInput {
      font-size: 20px;
      font-weight: bold;
    }

    .file-select {
      position: relative;
      display: inline-block;
    }

    .file-select::before {
      background-color: #cc9900;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      content: 'Change Photo';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .file-select input[type="file"] {
      
      opacity: 0;
      width: 200px;
      height: 32px;
      display: inline-block;
    }

    /* #src-file1::before {
      content: 'Seleccionar Archivo 1';
      } */
    `
  ]
})
export class ProfileUserComponent implements OnInit {

  btnEdit : boolean = false;
  craftImagePreview : any;
  loading: boolean = false;
  previsualizacion : string = '';

  src!: string | undefined;
  options: Options = {
    resize: {
      maxHeight: 500,
      maxWidth: 600
    },
    allowedExtensions: ['JPG', 'PnG', 'JPEG', 'GIF']
  };

  
  constructor( private AuthService      :      AuthService,
               private fb               :      FormBuilder,                             
               private snackbarServices :      SnackbardService,
               private sanitizer        :      DomSanitizer,
               private verificarImagen  :      VerificarImagenService,
               private vdatosServices   :      VerificarDatosService) { }



  get user(){
    return {...this.AuthService.user};
  }

  
  getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formProfile )
  }

  
  ngOnInit(): void {
    
    this.formProfile.get('uid')?.disable();
    this.formProfile.get('email')?.disable();
    this.formProfile.get('name')?.disable();
    this.formProfile.get('lastname')?.disable();
  }

    formProfile : FormGroup = this.fb.group({
      uid:      [`${ this.user.uid }`, Validators.required ],
      email:    [`${ this.user.email }`, Validators.required ],
      name:     [`${ this.user.name }`,[Validators.required, Validators.minLength(3), Validators.pattern(this.vdatosServices.nombrePattern) ]],
      lastname: [`${ this.user.lastname }`,[Validators.required, Validators.minLength(3), Validators.pattern(this.vdatosServices.nombrePattern)]],
      photo:    null
      
  
    })

  validarCampos( campo: string ){
    return this.vdatosServices.validarCampoCorrecto( campo, this.formProfile)
  }

  edit(){

    this.formProfile.get('name')?.enable();
    this.formProfile.get('lastname')?.enable();
    this.btnEdit = true;    
   

  }

  save(){
   
   
    if(this.formProfile.invalid){
      this.formProfile.markAllAsTouched();
      return;
    }
    this.loading = true;
    
    const {  name, lastname, photo } = this.formProfile.value

    
    this.formProfile.get('name')?.disable();
    this.formProfile.get('lastname')?.disable();
    this.AuthService.edit(this.user.uid!, name, lastname, photo)
        .subscribe( ok => {
          if(ok === true){         
            this.snackbarServices.mostrarMsgExito('Datos actualizados correctamente')
            
          }else {
                      
            this.snackbarServices.mostrarMsgError('Hubo un error a la hora de actualizar')
          }
          this.btnEdit = false;
          this.loading = false;
          
        })
  }

  selected(imageResult: ImageResult) {

    if( this.verificarImagen.imagenAdd( imageResult ) ){
  
      this.src = this.verificarImagen.base64;
     
      this.formProfile.get('photo')?.setValue( this.verificarImagen._file )
    }else {
      this.snackbarServices.mostrarMsgError(this.verificarImagen.error64)
      
    }  

  }


}
