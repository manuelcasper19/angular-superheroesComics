import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroeService } from '../../services/heroe.service';
import { AuthService } from '../../../auth/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { VerHeroe } from '../../interface/heroe.interface';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { SnackbardService } from '../../services/snackbard.service';
import { VerificarImagenService } from '../../../shared/validator/verificar-imagen.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarBorrarComponent } from '../../components/confirmar-borrar/confirmar-borrar.component';
import { Options, ImageResult } from "ngx-image2dataurl";
import { VerificarDatosService } from 'src/app/shared/validator/verificar-datos.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
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
    img{
     margin: 5px;
      width: 100%;
      height: 100%;
    }

    #photos{
      display: none;

    }

    .labelPhotos{
      
      width: 6rem;
      height: 6rem;
      background-color:  #D3D3D3;
      border-radius: 100%;
      padding: 1rem;
      cursor: pointer;
      /* box-shadow: 0 0 10px -1px rgb(73, 73, 73); */
      display: flex;
      justify-content: center;
      align-items: center;
       user-select: none; 
    }
    button {
      margin-left: 10px;
    }
    
    .icon {
      font-size: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* .labelPhotos:active {
      transform: scale(0,9);
    } */
    `
  ]
})
export class AddComponent implements OnInit, AfterViewInit {
  heroe!  : VerHeroe;
  
  arrayPhotos : any[] = [];
  archivosArray : any[] = [];
  btnActiveUpload : boolean = true;
  loading : boolean = false;
  btnReset : boolean = false;
  deleting : boolean = false;
  btnActiveLoading : boolean = true;
  btnActiveDeleting : boolean = true;


  publicaComiics   = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'DC Comics',
      desc: 'Marvel - Comics'
    }
  ];


  src!: string | undefined;
  options: Options = {
    resize: {
      maxHeight: 500,
      maxWidth: 700,
      
    },    
    allowedExtensions: ['JPG', 'PnG', 'JPEG', 'GIF'],
    
  };


  getErrorMsg( campo: string){
    return this.vdatosServices.getErrorMsg(campo, this.formHeroeAddEdit )
  }

  get user(){
    return this.AuthService.user
  }

  get arregloImg (){
    return this.formHeroeAddEdit.controls['photos'] as FormArray
  }


  constructor(private activateRouter    : ActivatedRoute,
              private heroeServices     : HeroeService,
              private router            : Router,
              private AuthService       : AuthService,
              private fb                : FormBuilder,              
              private snackbarServices  : SnackbardService,
              private verificarImagen   : VerificarImagenService,
              private dialog            : MatDialog,
              private vdatosServices    : VerificarDatosService) { 
                

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

    
    if(!this.router.url.includes('edit')){
      return;
    }
    this.formHeroeAddEdit.get('superheroe')?.disable();
    this.activateRouter.params
    .pipe(
      switchMap( ({ id }) => this.heroeServices.getHeroePorID( id, this.user.uid! ))
      
    )
    .subscribe(
      heroe => {
        this.heroe = heroe;     
                
        this.formHeroeAddEdit.reset( 
          {
            id            :  heroe.id,
            superheroe    :  heroe.superheroe,
            aniocreacion  :  heroe.aniocreacion,
            personajes    :  heroe.personajes,
            comics        :  heroe.comics,
            peliculas     :  heroe.peliculas,
            uid           :  heroe.uid,
            photos:      []
          }
        )
      }
     
    )

  }

   
  formHeroeAddEdit : FormGroup = this.fb.group( {
    id            : [],
    superheroe    : [``, [ Validators.required ]],
    aniocreacion  : [``, [ Validators.required ]],
    personajes    : [``, [ Validators.required, Validators.pattern(this.vdatosServices.nombrePattern) ]],
    comics        : [``, [ Validators.required ]],
    peliculas     : [``, [ Validators.required ]],
    uid           : [],
    photos        : this.fb.array([])
    
  },
  {
    
    validators: this.vdatosServices.verificarFechas('aniocreacion')
  }
      
  )

  nuevaFoto  : FormControl = this.fb.control('', Validators.required)
  

  validarCampos( campo: string ){
    return this.vdatosServices.validarCampoCorrecto(campo, this.formHeroeAddEdit);
  }
  guardar(){
    if(this.formHeroeAddEdit.invalid){
      this.formHeroeAddEdit.markAllAsTouched();
      return 
    }        
    this.arregloImg.removeAt(0)
    this.arregloImg.push(this.fb.control(this.archivosArray))

    this.loading = true;  
    
    this.btnActiveUpload = false;
    this.btnActiveDeleting = false;
    this.btnReset = false; 
     
    const { id, superheroe, aniocreacion, personajes, comics, peliculas } = this.formHeroeAddEdit.value;
     
    
    if(this.router.url.includes('edit')){
  
      
      this.peticionEndPoint( id, this.formHeroeAddEdit.get('superheroe')?.value, aniocreacion, personajes, comics, peliculas, this.user.uid!)
    }else {
      if(this.archivosArray.length === 0 ){
        
        let msg = 'Debe agregar al menos una imagen del heroe, intente de nuevo';        
        
        this.snackbarServices.mostrarMsgError(msg)
        this.loading = false;            
        this.btnActiveDeleting = true;
        this.btnActiveUpload = true;
        this.arregloImg.clear()
        this.btnReset = false;
        return;
      }

      this.peticionEndPoint( id, superheroe, aniocreacion, personajes, comics, peliculas,  this.user.uid!)
    }
    
  }

  private peticionEndPoint(id: string, superheroe: string, aniocreacion: number, personajes: string, 
                           comics: string, peliculas: string, uid: string){
    this.heroeServices.editHereo(id, superheroe, aniocreacion, personajes, comics, peliculas, uid, this.archivosArray)
        .subscribe( 
          heroe => {
            if(heroe.ok){
              //let css ='exito-snackbar';
                
              this.snackbarServices.mostrarMsgExito( 'Datos guardados satisfactoriamente' )
        
              this.router.navigateByUrl(`heroe/${heroe.id}`)
            }else {      
              
              this.snackbarServices.mostrarMsgError( this.heroeServices.error)
              
            }
            this.loading = false;    
            this.btnActiveUpload = true;            
            this.btnActiveDeleting = true;
       
          }
        )

  }

  addPhoto(){
 
   this.btnActiveUpload = false;
   this.btnReset = true;
   this.arregloImg.push( this.fb.control( this.nuevaFoto.value ))

  }

  selected(imageResult: ImageResult) {
    if(this.archivosArray.length >= 5){        
      this.snackbarServices.mostrarMsgError('No puede subir mas de 5  imagenes del heroe, intente de nuevo')
      return;
    }
   
    if( this.verificarImagen.imagenAdd( imageResult ) ){
  
      this.src = this.verificarImagen.base64;
      this.arrayPhotos.push(this.src)
      this.archivosArray.push(this.verificarImagen._file)
    }else {
      this.snackbarServices.mostrarMsgError(this.verificarImagen.error64)
      
    }  

  }
  

  resetear(){
    this.btnActiveUpload = true;
    this.btnReset = false;
    this.arregloImg.clear()
    this.archivosArray = [];
    this.arrayPhotos = [];
  

  }


   borrar(){
    
     const dialogo = this.dialog.open(ConfirmarBorrarComponent, {
       width: '400px',
       data: this.heroe
     })
     this.btnActiveLoading = false;
     this.deleting = true;
     this.btnActiveUpload = false
     this.btnReset = false;
     dialogo.afterClosed().subscribe(
       
       resultado => {
        
         if(resultado){ 
          this.heroeServices.borrarHeroe(this.heroe.id!, this.user.uid!)
          .subscribe( 
            resp => {
              if(resp.ok){
        
                this.snackbarServices.mostrarMsgExito(resp.msg)                
                this.router.navigateByUrl(`heroe`)
                this.deleting = false;
                this.btnActiveUpload = true;
                this.btnActiveLoading = true;
              
              }else {
            
                this.snackbarServices.mostrarMsgError(this.heroeServices.error)
                this.deleting = false;
                this.btnActiveUpload = true;
                this.btnActiveLoading = true;
               
              }
            }
          )
        
         }else {
          this.deleting = false;
          this.btnActiveUpload = true;
          this.btnActiveLoading = true;
          this.arregloImg.clear()
     
         }
        

       }
     )


   }
}

