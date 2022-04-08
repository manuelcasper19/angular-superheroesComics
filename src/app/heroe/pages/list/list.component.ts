import { Component, OnInit } from '@angular/core';

import { HeroeService } from '../../services/heroe.service';
import { Hero, Heroes } from '../../interface/heroe.interface';
import { SnackbardService } from '../../services/snackbard.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
  
    `
  ]
})
export class ListComponent implements OnInit {
 
  heroes : Hero [] = [] ;
  
  get user(){
    return this.AuthService.user
  }

  
  constructor(private heroeService      : HeroeService,
              private snackbarServices  : SnackbardService,
              private router            : Router,
              private AuthService       : AuthService
              ) { }

  ngOnInit(): void {
    if(this.router.url.includes('own')){
      this.heroeService.listHeroesOwn( this.user.uid! )
          .subscribe( heroes => {
            if(heroes.ok){
              this.heroes = heroes.heroes;
            }else {
              this.snackbarServices.mostrarMsgError(this.heroeService.error)
            }
          })

    }else {
      this.heroeService.listAllHeroe()
      .subscribe( 
        (heroes : Heroes) => {
        if(heroes){
          
          this.heroes = heroes.heroes;
          
        }else{
       
          this.snackbarServices.mostrarMsgError(this.heroeService.error)
        }
        
        
      })

    }

  }

}
