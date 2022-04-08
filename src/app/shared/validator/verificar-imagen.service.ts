import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { SnackbardService } from 'src/app/heroe/services/snackbard.service';
import { ImageResult } from 'ngx-image2dataurl';




@Injectable({
  providedIn: 'root'
})
export class VerificarImagenService {
  _base : string | undefined = '';
  _error: string = '';
  _file! : File;


 

  get base64(){
    return this._base
  }

  get error64(){
    return this._error
  }
  constructor( private sanitizer        : DomSanitizer,
               private snackbarServices :  SnackbardService ) { }

 extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
 
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
     reader.onload = () => {
      resolve({
        // blob: $event,
        // image,
        base: reader.result
      });
    };
    reader.onerror = error => {
      reject({
        // blob: $event,
        // image,
        base: null
      });
    };

  
})

previewImage(event: any, form: FormGroup, campo: string): boolean {
    

    const filetype = /jpeg|jpg|png|gif/;
    const archivoCapturado = event.target.files[0];
    const mimetype = filetype.test(archivoCapturado.type);

  if(mimetype){
  form.get(campo)?.setValue( archivoCapturado )

  this.extraerBase64(archivoCapturado).then( (imagen: any) => {
    this._base = imagen.base;
    console.log(this._base)
    return true
    
  })
  
}else{
  this._error = 'la imagen debe ser JPG, PNG o GIF';
   return false
}
return true
}



dataURItoBlob(dataURI: any, filename: any ) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = decodeURI(dataURI.split(',')[1]);

 
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new File([ia], filename,  { type: "image/jpeg"});
} 


imagenAdd(imageResult: ImageResult ): boolean {
  if(imageResult.file.size > 1000000){
    this._error = 'La imagen no puede pesar mas de  1 mb, intente con otro';
    return false;
  }
  
  const filetype = /jpeg|jpg|png|gif/;
 
  const mimetype = filetype.test(imageResult.file.type);

  if(mimetype){

    if (imageResult.error){
      this._error = imageResult.error;
      return false;

    }  

    this._base = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;
     
    const blob = this.dataURItoBlob(this._base, imageResult)
            
    const image = new File([blob], imageResult.file.name, { type: imageResult.resized?.type});
    //  this.formProfile.get('photo')?.setValue( image )
    this._file = image;
    return true;

  }else {
    this._error = 'La imagen debe ser JPG, JPEG, PNG o GIF, por favor ingrese un archivo correcto';
    return false;
  }

}

}
