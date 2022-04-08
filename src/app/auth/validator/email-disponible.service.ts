import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { EmailDisponible } from '../interface/auth.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailDisponibleService implements AsyncValidator {
  private _urlEndPoint         :   string   = environment.baseUrlAuth;

  constructor( private http: HttpClient ) { }
  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
    
    const url  = `${ this._urlEndPoint }/auth/usuario?email=${ email }`
  
    return this.http.get<EmailDisponible>(url)
           .pipe(
             
             map( resp => {
              
               
               return ( resp.ok === true)
               ? null
               : { emailTomado : true}
             })
           )
  }
}
