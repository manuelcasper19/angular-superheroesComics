import { Component, Input, OnInit } from '@angular/core';
import { Heroes, Hero } from '../../interface/heroe.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tarjeta-heroe',
  templateUrl: './tarjeta-heroe.component.html',
  styleUrls: ['./tarjeta-heroe.component.css']
})
export class TarjetaHeroeComponent implements OnInit {

  @Input() heroe! : Hero;

  get user(){
    return this.AuthService.user
  }

  constructor( private AuthService     : AuthService ) { }

  ngOnInit(): void {
  }

}
