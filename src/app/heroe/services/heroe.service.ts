import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Heroes, VerHeroe, Heroeeditado, heroesSearch } from '../interface/heroe.interface';
import { map, catchError,  of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  private _urlHeroes = environment.baseUrlHeroes;
  arrayPhotos : any[] = [];
  private _error : string = '';

  constructor( private http:  HttpClient ) { }

  get error(){
    return this._error
  }

  listAllHeroe(){
      return this.http.get<Heroes>(`${ this._urlHeroes }/heroes`)
             .pipe(
               map( heroe => heroe ),
               catchError( err => of( err.error.msg ) ),
               tap( err => this._error = err )
             )

  }

  listHeroesOwn(id: string){
    const url = `${ this._urlHeroes}/heroes/list?uid=${ id }`;
    return  this.http.get<Heroes>(url)
              .pipe(
                tap( resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token!)         

                }
                }),
                map( heroe => heroe ),
                catchError(err => of( err.error.msg )),
                tap( err => this._error = err )
              )

  }

  getHeroePorID( id : string, uid: string ){
    
    const url = `${ this._urlHeroes }/heroes/ver/?id=${ id }&uid=${ uid }`;
    return this.http.get<VerHeroe>( url )
            .pipe(
              tap( resp => {
                if(resp.ok){
                  localStorage.setItem('token', resp.token!)
                }
              }),
              map( heroe => heroe ),
              catchError(err => of( err.error.msg ))
            )
  }

  editHereo(id: string, superheroe : string, 
    aniocreacion: number, personajes: string, comics : string, peliculas: string,
     uid : string, photo: File[]){      
      
          const formData: FormData = new FormData()
    //formData.append('photo', photo);
    for (let i = 0; i < photo.length; i++) {
      
      formData.append('photos', photo[i]);
      
    }
    
    formData.append('superheroe', superheroe)
    formData.append('aniocreacion', aniocreacion.toString())
    formData.append('personajes', personajes)
    formData.append('comics', comics)
    formData.append('peliculas', peliculas)
    formData.append('uid', uid)
    
    
    if(id){
      formData.append('id', id)
      
      const url = ` ${ this._urlHeroes}/heroes/edit`;
    return this.http.put<Heroeeditado>(url, formData)
               .pipe(
                 tap( resp => {
                   
                  if(resp.ok){
                    localStorage.setItem('token', resp.token!)         

                  }
                 }),
                 map( heroe => heroe ),
                 catchError(err => of( err.error.msg )),
                 tap( err => this._error = err )
               )
        }else {
          
          const url = ` ${ this._urlHeroes}/heroes/add`;
          
          return this.http.post<Heroeeditado>(url, formData)
               .pipe(
                 tap( resp => {
                  
                  if(resp.ok){
                    localStorage.setItem('token', resp.token!)         

                  }
                 }),
                 map( heroe => heroe ),
                 catchError(err => of( err.error.msg )),
                 tap( err => this._error = err )
               )

              }
  }

  borrarHeroe( id: string, uid: string ){
    
    const url = ` ${ this._urlHeroes}/heroes/delete?id=${id}&uid=${uid}`;

   return this.http.delete<Heroeeditado>(url)
    
  
  }

  busarHeroeSugerencia( superheroe: string, uid: string ){
    const url = `${ this._urlHeroes}/heroes/search?superheroe=${superheroe}&uid=${uid}`;
    return this.http.get<heroesSearch>(url)
          

  }


}
