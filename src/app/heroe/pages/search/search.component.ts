import { Component, OnInit } from '@angular/core';
import { Hero, Heroes, heroesSearch, VerHeroe } from '../../interface/heroe.interface';
import { HeroeService } from '../../services/heroe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
    `
     mat-form-field {      
      width: 100%;     
      justify-content: center;
      align-items: center;
    }

    .input {
      width: 100%;     
      justify-content: center;
      align-items: center;
    }
 
    `
  ]
})
export class SearchComponent implements OnInit {

  termino                :      string   = '';
  heroes                 :      Hero [] = []
  heroeSeleccionado      :      VerHeroe   | undefined;
  error                  :      boolean  = false;


  get user(){
    return this.AuthService.user
  }


  constructor( private heroeServices     : HeroeService,
               private fb                : FormBuilder,
               private AuthService       : AuthService, ) { }

  ngOnInit(): void {
  }

  formSearch : FormGroup   = this.fb.group( {
    superheroe : ['', [Validators.required]]
  })
  buscarHeroeSugerido(){
    
    this.heroeServices.busarHeroeSugerencia(this.formSearch.get('superheroe')?.value, this.user.uid!)
         .subscribe(( heroes: heroesSearch) => {
          
           if(heroes.arrayHeroes.length>0){
            
            this.heroes = heroes.arrayHeroes
           }else {
             this.heroes = []
           }
          } )

  }

  opcionSeleccionada(event : MatAutocompleteSelectedEvent){

    if(!event.option.value) {  
      this.heroeSeleccionado = undefined;
      return 
    }
    

    const heroe : VerHeroe = event.option.value;
    this.formSearch.get('superheroe')?.setValue( heroe.superheroe)
  

    this.heroeServices.getHeroePorID ( heroe.id!, heroe.uid )
    .subscribe( 
      (heroe) => {
         
        this.heroeSeleccionado = heroe
      }
    
    )

  }
}
