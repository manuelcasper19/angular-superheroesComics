import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero, VerHeroe } from '../../interface/heroe.interface';
import { HeroeService } from '../../services/heroe.service';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-ver-heroe',
  templateUrl: './ver-heroe.component.html',
  styles: [
    
    `
    img {
      width: 100%;
	    border-radius: 10px;
    }
    `
  ]
})
export class VerHeroeComponent implements OnInit {

  heroe!  : VerHeroe;

  get user(){
    return this.AuthService.user
  }

  get verificarUsuariodeHeroe(){
    return (this.user.uid === this.heroe.uid)
 
     
   }
 
  constructor(  private activateRouter  : ActivatedRoute,
                private heroeServices   : HeroeService,
                private router          : Router,
                private AuthService     : AuthService) { }

  ngOnInit(): void {
    
    this.activateRouter.params
        .pipe(
          switchMap( ({ id }) => this.heroeServices.getHeroePorID( id, this.user.uid! ))
          
        )
        .subscribe(
          heroe => {
            this.heroe = heroe;
          
            
          }
         
        )
  }



}
