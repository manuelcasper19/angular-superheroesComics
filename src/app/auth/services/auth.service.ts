import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';

import { UserResponse, User } from '../interface/auth.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _urlAuth : string = environment.baseUrlAuth
  private _user! : User;

  get user(){
    return {...this._user}
  }

  constructor( private http: HttpClient) { }


  login( email: string, password: string ){
    const url = `${this._urlAuth}/auth/login`;
    const body  = { email, password };
    
   return this.peticionHttpAuth( url, body)
          

  }

  register( email: string, password: string, name: string, lastname: string ){
    const body = { name, lastname, email, password };
    const url = `${this._urlAuth}/auth/new`

    return this.peticionHttpAuth( url, body);

  }

  logout(){
    localStorage.clear();
  }

  edit( uid: string, name: string, lastname: string, img: File){
    // const body = { uid, name, lastname, img };
    const fomData = new FormData();
    fomData.append('photo', img );
    fomData.append('uid', uid );
    fomData.append('name', name );
    fomData.append('lastname', lastname );
    const url = `${this._urlAuth}/auth/edit`
    
    
    return this.http.put<UserResponse>(url, fomData )
           .pipe(
             tap( resp => {
               if(resp.ok){
                localStorage.setItem('token', resp.token!)
               }
             }),
             map( resp => resp.ok ),
             catchError( err => of( err.error.msg))
           )

  }

  peticionHttpAuth ( url: string, body: User){
    return this.http.post<UserResponse>(url, body )
           .pipe( 
             tap( resp => {
               if(resp.ok){
                 localStorage.setItem('token', resp.token!)
               }
             }),
             map( resp => resp.ok),
             catchError( err => of( err.error.msg))
           )
  }


  validarToken(): Observable<boolean>{
    const url = `${this._urlAuth}/auth/renew`;
    const headers = new HttpHeaders()
          .set('x-api-key', localStorage.getItem('token') || '' )
    
    return  this.http.get<UserResponse>(url, { headers} )
           .pipe(
            //delay(1000),
             map( resp => {
               
               localStorage.setItem('token', resp.token!)
               this._user = {
                 name: resp.name!,
                 lastname: resp.lastname!,
                 uid: resp.uid!,
                 email: resp.email!,
                 img: resp.img!,
                 public_id: resp.public_id!
                 
               }

               return resp.ok

             }),            
             catchError(err => of(false))
           )


  }

}
